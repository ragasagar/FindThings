package com.sap.findthings.dto;

import com.sap.findthings.domain.ItemSummary;
import com.sap.findthings.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * The type Order dto.
 */
@Getter
@Setter
public class OrderDto {
    private Integer orderId;
    private List<Items> items;
    private Integer buyerId;
    private Integer shopId;
    private Date time;
    private Integer totalPrice;
    private Status status;

    /**
     * The type Items.
     */
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Items{
        private String name;
        private Integer size;
        private Integer price;
        private  Integer cost;

        /**
         * Instantiates a new Items.
         *
         * @param items the items
         */
        public Items(ItemSummary items){
            name= items.getName();
            size= items.getSize();
            price = items.getPrice();
            cost = items.getCost();
        }
    }
}
