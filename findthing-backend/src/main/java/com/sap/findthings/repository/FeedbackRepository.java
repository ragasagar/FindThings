package com.sap.findthings.repository;

import com.sap.findthings.domain.Feedback;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Feedback repository.
 */
@Repository
public interface FeedbackRepository extends CrudRepository<Feedback, Integer> {

    /**
     * Find all by shop id list.
     *
     * @param shopId the shop id
     * @return the list
     */
    List<Feedback> findAllByShopId(final int shopId);
}
