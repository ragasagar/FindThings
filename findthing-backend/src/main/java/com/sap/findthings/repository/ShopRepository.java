package com.sap.findthings.repository;

import com.sap.findthings.domain.Shop;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * The interface Shop repository.
 */
public interface ShopRepository extends CrudRepository<Shop, Integer> {

    List<Shop> findAll();
}
