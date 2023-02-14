package com.sap.findthings.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sap.findthings.dto.OrderDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * The type Item summary.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class ItemSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer itemId;
    private String name;
    private Integer price;
    private Integer size;
    private Integer cost;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", referencedColumnName = "orderId")
    @JsonIgnoreProperties("items")
    private Orders order;

    /**
     * Instantiates a new Item summary.
     *
     * @param items the items
     */
    public ItemSummary(OrderDto.Items items){
        name = items.getName();
        price = items.getPrice();
        cost = items.getCost();
        size=items.getSize();
    }
}
