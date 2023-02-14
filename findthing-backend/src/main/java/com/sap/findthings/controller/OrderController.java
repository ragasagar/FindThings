package com.sap.findthings.controller;

import com.sap.findthings.domain.Orders;
import com.sap.findthings.dto.OrderDto;
import com.sap.findthings.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type Order controller.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;


    /**
     * Place order orders.
     *
     * @param order the order
     * @return the orders
     */
    @PostMapping
    public Orders placeOrder(@RequestBody OrderDto order) {
        return orderService.placeOrder(order);
    }


    /**
     * Update order orders.
     *
     * @param orderDto the order dto
     * @return the orders
     */
    @PutMapping
    public Orders updateOrder(@RequestBody OrderDto orderDto) {
        return orderService.updateOrder(orderDto);
    }

    /**
     * Get buyer history list.
     *
     * @param buyerId the buyer id
     * @return the list
     */
    @GetMapping("/users/{buyerId}")
    public List<OrderDto> getBuyerHistory(@PathVariable int buyerId){
        return orderService.getHistoryOrders(buyerId);
    }

    /**
     * Get seller orders list.
     *
     * @param shopId the shop id
     * @return the list
     */
    @GetMapping("/shops/{shopId}")
    public List<OrderDto> getSellerOrders(@PathVariable int shopId){
        return orderService.getLiveOrders(shopId);
    }

    /**
     * Get seller history list.
     *
     * @param shopId the shop id
     * @return the list
     */
    @GetMapping("/shops/{shopId}/history")
    public List<OrderDto> getSellerHistory(@PathVariable int shopId){
        return orderService.getSellerHistory(shopId);
    }
}
