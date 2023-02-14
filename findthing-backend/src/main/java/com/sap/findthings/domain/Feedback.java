package com.sap.findthings.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * The type Feedback.
 */
@Getter
@Setter
@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private Integer shopId;

    private Integer rate;
    private String feedback;

}
