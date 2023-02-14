package com.sap.findthings.repository;

import com.sap.findthings.domain.Orders;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Order repository.
 */
@Repository
public interface OrderRepository extends CrudRepository<Orders, Integer> {

    /**
     * Find all by buyer id list.
     *
     * @param buyerId the buyer id
     * @return the list
     */
    List<Orders> findAllByBuyerId(final Integer buyerId);

    /**
     * Find all by shop id and status list.
     *
     * @param shopId the shop id
     * @param status the status
     * @return the list
     */
    List<Orders> findAllByShopIdAndStatus(final Integer shopId, final String status);


    /**
     * Find all by shop id and status not in list.
     *
     * @param shopId     the shop id
     * @param statusList the status list
     * @return the list
     */
    List<Orders> findAllByShopIdAndStatusNotIn(final Integer shopId, final List<String> statusList);

}