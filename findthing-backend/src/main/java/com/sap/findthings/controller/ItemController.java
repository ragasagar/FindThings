package com.sap.findthings.controller;

import com.sap.findthings.domain.ItemRepresentation;
import com.sap.findthings.dto.ItemSummaryDto;
import com.sap.findthings.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * The type Item controller.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;


    /**
     * Add item item representation.
     *
     * @param itemRepresentation the item representation
     * @return the item representation
     */
    @PostMapping
    public ItemRepresentation addItem(@RequestBody ItemRepresentation itemRepresentation) {
        return itemService.addItem(itemRepresentation);
    }

    /**
     * Add items list.
     *
     * @param itemRepresentation the item representation
     * @return the list
     */
    @PostMapping("/bulk")
    public List<ItemRepresentation> addItems(@RequestBody List<ItemRepresentation> itemRepresentation) {
        return itemService.addItems(itemRepresentation);
    }

    /**
     * Gets item by shop.
     *
     * @param shopId the shop id
     * @return the item by shop
     */
    @GetMapping
    public List<ItemRepresentation> getItemByShop(@RequestParam int shopId) {
        return itemService.getItemsForShop(shopId);
    }

    /**
     * Update items representation.
     *
     * @param shopId             the shop id
     * @param itemRepresentation the item representation
     * @return the item representation
     */
    @PutMapping("/shops/{shopId}")
    public ItemRepresentation updateItems(@PathVariable final int shopId, @RequestBody ItemRepresentation itemRepresentation) {
        return itemService.updateItem(shopId, itemRepresentation);
    }

    /**
     * Search item by name list.
     *
     * @param principal the principal
     * @param name      the name
     * @return the list
     */
    @GetMapping("/search/{name}")
    public List<String> searchItemByName(Principal principal, @PathVariable("name") String name) {
        return itemService.getItemName(name);
    }

    /**
     * Gets item summary. It get the list of items present in the respective shops and their prices in different shops.
     *
     * @param itemNames the item names
     * @return the item summary
     */
    @GetMapping("/quote")
    public List<ItemSummaryDto> getItemSummary(@RequestParam("items") final List<String> itemNames) {
        return itemService.getQuote(itemNames);
    }
}
