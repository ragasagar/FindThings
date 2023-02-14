package com.sap.findthings.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * The type Shop rating.
 */
@Getter
@Setter
@Entity
public class ShopRating {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    private Integer shopId;

    private Integer rate;

    private String feedback;

}
