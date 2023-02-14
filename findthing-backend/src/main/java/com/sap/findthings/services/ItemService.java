package com.sap.findthings.services;

import com.sap.findthings.domain.ItemRepresentation;
import com.sap.findthings.dto.ItemSummaryDto;

import java.util.List;

/**
 * The interface Item service.
 */
public interface ItemService {

    /**
     * Add item item representation.
     *
     * @param itemRepresentation the item representation
     * @return the item representation
     */
    ItemRepresentation addItem(ItemRepresentation itemRepresentation);

    /**
     * Update item item representation.
     *
     * @param shopId             the shop id
     * @param itemRepresentation the item representation
     * @return the item representation
     */
    ItemRepresentation updateItem(final int shopId, ItemRepresentation itemRepresentation);

    /**
     * Gets items for shop.
     *
     * @param shopId the shop id
     * @return the items for shop
     */
    List<ItemRepresentation> getItemsForShop(int shopId);

    /**
     * Gets item name.
     *
     * @param itemPrefix the item prefix
     * @return the item name
     */
    List<String> getItemName(final String itemPrefix);

    /**
     * Gets quote.
     *
     * @param itemNames the item names
     * @return the quote
     */
    List<ItemSummaryDto> getQuote(List<String> itemNames);

    /**
     * Add items list.
     *
     * @param itemRepresentation the item representation
     * @return the list
     */
    List<ItemRepresentation>  addItems(List<ItemRepresentation> itemRepresentation);
}
