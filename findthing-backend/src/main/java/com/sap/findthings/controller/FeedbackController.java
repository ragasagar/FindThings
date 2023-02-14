package com.sap.findthings.controller;

import com.sap.findthings.domain.Feedback;
import com.sap.findthings.services.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * The type Feedback controller.
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedBackService feedBackService;


    /**
     * Post feedback from the user.
     *
     * @param principal the principal
     * @param feedback  the feedback
     * @return the feedback
     */
    @PostMapping
    public Feedback postFeedback(Principal principal, @RequestBody Feedback feedback){
        System.out.println(principal.getName());
        return feedBackService.saveFeedback(feedback);
    }

    /**
     * Gets feedbacks for the respective shops that can be viewed.
     *
     * @param shopId the shop id
     * @return the feedbacks
     */
    @GetMapping("/{shopId}")
    public List<Feedback> getFeedbacks(@PathVariable("shopId") Integer shopId){
        return  feedBackService.getFeedback(shopId);
    }
}
