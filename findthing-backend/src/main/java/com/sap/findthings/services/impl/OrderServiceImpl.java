package com.sap.findthings.services.impl;

import com.sap.findthings.domain.ItemSummary;
import com.sap.findthings.domain.Orders;
import com.sap.findthings.dto.OrderDto;
import com.sap.findthings.enums.Status;
import com.sap.findthings.exception.FindThingException;
import com.sap.findthings.repository.ItemRepresentationRepository;
import com.sap.findthings.repository.OrderRepository;
import com.sap.findthings.services.OrderService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * The type Order service.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepresentationRepository itemRepresentationRepository;

    @Override
    public Orders placeOrder(OrderDto order) {
        final List<String> errors = new ArrayList<>();
        if (null != order.getShopId() && null != order.getBuyerId()) {
            if (null != order.getItems() && !order.getItems().isEmpty()) {
                Orders order1 = new Orders();
                BeanUtils.copyProperties(order, order1);
                order1.setStatus(order.getStatus().name());
                order1.setItems(order.getItems().stream().map(ItemSummary::new).collect(Collectors.toList()));
                return orderRepository.save(order1);
            } else {
                errors.add("Items missing");
            }
        } else {
            errors.add("ShopId/BuyerId is missing");
        }
        throw new FindThingException(errors, HttpStatus.BAD_REQUEST.value());
    }

    @Override
    public Orders updateOrder(OrderDto orderDto) {
        final Optional<Orders> order = orderRepository.findById(orderDto.getOrderId());
        if (order.isPresent()) {
            Orders order1 = order.get();
            order1.setStatus(orderDto.getStatus().name());
            if (!Status.COMPLETED.equals(orderDto.getStatus())) {
                return orderRepository.save(order1);
            } else {
                orderDto.getItems().forEach(item ->
                        itemRepresentationRepository.findItemRepresentationByNameAndShopId(item.getName(), orderDto.getShopId()).ifPresent(
                                itemRepresentation -> {
                                    int value = itemRepresentation.getStocks() - item.getSize() > 0 ? item.getSize() : itemRepresentation.getStocks();
                                    itemRepresentation.setStocks(itemRepresentation.getStocks() - value);
                                    item.setSize(value);
                                    itemRepresentationRepository.save(itemRepresentation);
                                })

                );
                return orderRepository.save(order1);
            }
        } else {
            throw new FindThingException(Collections.singletonList("Missing orderId"), HttpStatus.NOT_FOUND.value());
        }
    }

    @Override
    public List<OrderDto> getHistoryOrders(int buyerId) {
        return orderToOrderDTO(orderRepository.findAllByBuyerId(buyerId));
    }

    @Override
    public List<OrderDto> getLiveOrders(int shopId) {
        return orderToOrderDTO(orderRepository.findAllByShopIdAndStatus(shopId, Status.ORDERED.name()));
    }

    @Override
    public List<OrderDto> getSellerHistory(int shopId) {
        return orderToOrderDTO(orderRepository.findAllByShopIdAndStatusNotIn(shopId, List.of(Status.ORDERED.name())));
    }

    private List<OrderDto> orderToOrderDTO(final List<Orders> orders) {
        final List<OrderDto> orderDtos = new ArrayList<>();
        orders.sort((a, b) -> b.getOrderId() - (a.getOrderId()));
        orders.forEach(order -> {
            OrderDto orderDto = new OrderDto();
            BeanUtils.copyProperties(order, orderDto);
            orderDto.setItems(order.getItems().stream().map(OrderDto.Items::new).collect(Collectors.toList()));
            orderDto.setStatus(Status.valueOf(order.getStatus()));
            orderDto.setTotalPrice(order.getItems().stream().map(ItemSummary::getCost).mapToInt(Integer::intValue).sum());
            orderDtos.add(orderDto);
        });
        return orderDtos;
    }
}
