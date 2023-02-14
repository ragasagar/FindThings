package com.sap.findthings.controller;

import com.sap.findthings.domain.Shop;
import com.sap.findthings.domain.UserRepresentation;
import com.sap.findthings.repository.ShopRepository;
import com.sap.findthings.services.UserRepresentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * The type User controller.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepresentationService userRepresentationService;

    @Autowired
    private ShopRepository shopRepository;


    /**
     * Add user user representation.
     *
     * @param userRepresentation the user representation
     * @return the user representation
     */
    @PostMapping
    public UserRepresentation addUser(@RequestBody UserRepresentation userRepresentation) {
        return userRepresentationService.addUser(userRepresentation);
    }

    /**
     * Update user user representation.
     *
     * @param userRepresentation the user representation
     * @param principal          the principal
     * @return the user representation
     */
    @PutMapping
    public UserRepresentation updateUser(@RequestBody UserRepresentation userRepresentation, Principal principal) {
        return userRepresentationService.updateUser(userRepresentation.getId(), userRepresentation, principal.getName());
    }


    /**
     * Gets login.
     *
     * @param principal the principal
     * @return the login
     */
    @GetMapping("/auth/login")
    public UserRepresentation getLogin(Principal principal) {
        return userRepresentationService.getUserInfoByUserName(principal.getName());
    }

    /**
     * Get shops list.
     *
     * @param principal the principal
     * @return the list
     */
    @GetMapping("/shops")
    public List<Shop> getShops(Principal principal){
        return shopRepository.findAll();
    }
}
