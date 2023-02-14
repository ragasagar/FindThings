package com.sap.findthings.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

/**
 * The type Item representation.
 */
@Getter
@Setter
@Entity
@Table(name = "item_representation")
public class ItemRepresentation implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column
    private String name;

    @Column
    private Double price;

    @Column
    private int shopId;

    @Column
    private Integer stocks;
}
