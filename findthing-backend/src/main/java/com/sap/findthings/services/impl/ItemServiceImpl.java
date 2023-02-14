package com.sap.findthings.services.impl;

import com.sap.findthings.domain.ItemRepresentation;
import com.sap.findthings.domain.Shop;
import com.sap.findthings.dto.ItemSummaryDto;
import com.sap.findthings.exception.FindThingException;
import com.sap.findthings.repository.ItemRepresentationRepository;
import com.sap.findthings.repository.ShopRepository;
import com.sap.findthings.services.ItemService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

/**
 * The type Item service.
 */
@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepresentationRepository itemRepresentationRepository;

    @Autowired
    private ShopRepository shopRepository;

    private ExecutorService executorService = Executors.newFixedThreadPool(10);

    @Override
    public ItemRepresentation addItem(ItemRepresentation itemRepresentation) {
        if (0 == itemRepresentation.getPrice() && 0 == itemRepresentation.getStocks()
                && !StringUtils.isNotBlank(itemRepresentation.getName())) {
            throw new FindThingException(Collections.singletonList("Item Name/Price/Stock size information not present"),
                    HttpStatus.BAD_REQUEST.value());
        }
        itemRepresentationRepository.findItemRepresentationByNameAndShopId(itemRepresentation.getName(), itemRepresentation.getShopId())
                .ifPresent(itemRepresentation1 -> {
                    throw new FindThingException(Collections.singletonList("Item already exist for the shopId"),
                            HttpStatus.BAD_REQUEST.value());
                });
        return itemRepresentationRepository.save(itemRepresentation);
    }

    @Override
    public ItemRepresentation updateItem(int shopId, ItemRepresentation itemRepresentation) {
        if (itemRepresentation.getId() != 0 && shopId == itemRepresentation.getShopId()) {
            final Optional<ItemRepresentation> itemRepresentationOptional = itemRepresentationRepository.
                    findById(itemRepresentation.getId());
            if (0 == itemRepresentation.getPrice() && 0 == itemRepresentation.getStocks()
                    && StringUtils.isNotBlank(itemRepresentation.getName())) {
                throw new FindThingException(Collections.singletonList("Item Name/Price/Stock size information not present"),
                        HttpStatus.BAD_REQUEST.value());
            }
            itemRepresentationOptional.ifPresent(itemRepresentation1 -> {
                itemRepresentation1.setPrice(itemRepresentation.getPrice());
                itemRepresentation1.setStocks(itemRepresentation.getStocks());
                itemRepresentation1.setName(itemRepresentation.getName());
                itemRepresentationRepository.save(itemRepresentation1);
            });
            return itemRepresentation;
        }
        throw new FindThingException(Collections.singletonList("Id not given/shopId not matching  with the item"),
                HttpStatus.NOT_FOUND.value());
    }

    @Override
    public List<ItemRepresentation> getItemsForShop(int shopId) {
        return itemRepresentationRepository.findAllByShopId(shopId);
    }

    @Override
    public List<String> getItemName(String itemPrefix) {
        final List<ItemRepresentation> itemRepresentations = itemRepresentationRepository.findAllByNameContaining(itemPrefix);
        if (!itemRepresentations.isEmpty()) {
            return itemRepresentations.stream().map(ItemRepresentation::getName).distinct().collect(Collectors.toList());
        }
        throw new FindThingException(Collections.singletonList("No item exist with given name"),
                HttpStatus.NOT_FOUND.value());
    }

    @Override
    public List<ItemSummaryDto> getQuote(final List<String> itemNames) {
        final List<ItemSummaryDto> itemSummaryDtos = new ArrayList<>();
        List<Shop> shops = shopRepository.findAll();
        Map<Integer, Future<List<ItemRepresentation>>> itemList = new HashMap<>();
        shops.forEach(shop -> {
            Future<List<ItemRepresentation>> itemRepresentation = executorService.submit(() -> getQuote(itemNames, shop.getShopId()));
            itemList.put(shop.getShopId(), itemRepresentation);
        });

        itemList.forEach((key, value) -> {
            ItemSummaryDto itemSummaryDto = new ItemSummaryDto();
            try {
                itemSummaryDto.setShopId(key);
                itemSummaryDto.setItems(value.get());
                itemSummaryDto.setPrice(itemSummaryDto.getItems().stream()
                        .map(ItemRepresentation::getPrice).mapToDouble(Double::doubleValue).sum());
                itemSummaryDtos.add(itemSummaryDto);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        });
        itemSummaryDtos.sort((a, b) -> b.getItems().size() - a.getItems().size());
        return itemSummaryDtos.stream().filter(item -> !item.getItems().isEmpty()).collect(Collectors.toList());
    }

    @Override
    public List<ItemRepresentation>  addItems(List<ItemRepresentation> itemRepresentations) {
        itemRepresentations.forEach(itemRepresentation -> {
            try{
                addItem(itemRepresentation);
            }catch (Exception e){
            }
        });
        return itemRepresentations;
    }


    private List<ItemRepresentation> getQuote(final List<String> itemName, int shopId) {
        return itemRepresentationRepository.findItemRepresentationByNameInAndShopIdAndStocksGreaterThan(itemName, shopId,0);
    }
}
