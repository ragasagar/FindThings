package com.sap.findthings.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

import javax.persistence.*;

/**
 * The type User representation.
 */
@Entity
@Getter
@Setter
@Table(name = "users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRepresentation implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", length = 25)
    private Integer id;

    @Column(name = "username", length = 50, unique = true)
    private String userName;

    @Column(name = "name", length = 150)
    private String name;

    @Column(name = "password", length = 800)
    private String password;

    @Column(name = "role", length = 50)
    private String role;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name ="email")
    private String email;

    @Column(name ="address")
    private String address;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Shop shop;
}