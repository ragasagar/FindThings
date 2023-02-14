package com.sap.findthings.repository;

import com.sap.findthings.domain.ItemRepresentation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * The interface Item representation repository.
 */
@Repository
public interface ItemRepresentationRepository extends CrudRepository<ItemRepresentation, Integer> {

    /**
     * Find all by shop id list.
     *
     * @param shopId the shop id
     * @return the list
     */
    List<ItemRepresentation> findAllByShopId(final Integer shopId);

    /**
     * Find all by name containing list.
     *
     * @param name the name
     * @return the list
     */
    @Query("select distinct i from ItemRepresentation as i  where i.name like %:name%")
    List<ItemRepresentation> findAllByNameContaining(final String name);

    /**
     * Find item representation by name in and shop id and stocks greater than list.
     *
     * @param itemNames the item names
     * @param shopId    the shop id
     * @param value     the value
     * @return the list
     */
    List<ItemRepresentation> findItemRepresentationByNameInAndShopIdAndStocksGreaterThan(final List<String> itemNames, final int shopId, final int value);

    /**
     * Find item representation by name and shop id optional.
     *
     * @param name   the name
     * @param shopId the shop id
     * @return the optional
     */
    Optional<ItemRepresentation> findItemRepresentationByNameAndShopId(final String name, final Integer shopId);
}
