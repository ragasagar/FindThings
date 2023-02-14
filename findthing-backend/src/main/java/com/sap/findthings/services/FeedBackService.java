package com.sap.findthings.services;

import com.sap.findthings.domain.Feedback;

import java.util.List;

/**
 * The interface Feed back service.
 */
public interface FeedBackService {

    /**
     * Save feedback feedback.
     *
     * @param feedback the feedback
     * @return the feedback
     */
    Feedback saveFeedback(Feedback feedback);

    /**
     * Gets feedback.
     *
     * @param shopId the shop id
     * @return the feedback
     */
    List<Feedback> getFeedback(final int shopId);
}
