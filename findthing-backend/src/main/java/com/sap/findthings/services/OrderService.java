package com.sap.findthings.services;


import com.sap.findthings.domain.Orders;
import com.sap.findthings.dto.OrderDto;

import java.util.List;

/**
 * The interface Order service.
 */
public interface OrderService {

    /**
     * Place order orders.
     *
     * @param order the order
     * @return the orders
     */
    Orders placeOrder(OrderDto order);

    /**
     * Update order orders.
     *
     * @param orderDto the order dto
     * @return the orders
     */
    Orders updateOrder(OrderDto orderDto);


    /**
     * Gets history orders.
     *
     * @param buyerId the buyer id
     * @return the history orders
     */
    List<OrderDto> getHistoryOrders(final int buyerId);

    /**
     * Gets live orders.
     *
     * @param shopId the shop id
     * @return the live orders
     */
    List<OrderDto> getLiveOrders(final int shopId);

    /**
     * Gets seller history.
     *
     * @param shopId the shop id
     * @return the seller history
     */
    List<OrderDto> getSellerHistory(int shopId);
}
