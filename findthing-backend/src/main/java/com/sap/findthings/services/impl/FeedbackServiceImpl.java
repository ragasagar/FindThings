package com.sap.findthings.services.impl;

import com.sap.findthings.domain.Feedback;
import com.sap.findthings.exception.FindThingException;
import com.sap.findthings.repository.FeedbackRepository;
import com.sap.findthings.services.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * The type Feedback service.
 */
@Service
public class FeedbackServiceImpl implements FeedBackService {

    @Autowired
    private FeedbackRepository feedbackRepository;


    /**
     * @param feedback
     * @return
     */
    @Override
    public Feedback saveFeedback(Feedback feedback) {
        if(null != feedback.getShopId()){
            return feedbackRepository.save(feedback);
        }
        throw  new FindThingException(Collections.singletonList("ShopId not present"), HttpStatus.BAD_REQUEST.value());
    }

    @Override
    public List<Feedback> getFeedback(int shopId) {
        List<Feedback> feedbacks = feedbackRepository.findAllByShopId(shopId);
        feedbacks.sort((a, b) -> b.getId() - a.getId());
        return feedbacks;
    }
}
