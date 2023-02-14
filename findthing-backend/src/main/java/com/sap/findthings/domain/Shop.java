package com.sap.findthings.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;

/**
 * The type Shop.
 */
@Entity
@Getter
@Setter
public class Shop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "shopId", nullable = false)
    private Integer shopId;
    private String name;
    private String address;
}
