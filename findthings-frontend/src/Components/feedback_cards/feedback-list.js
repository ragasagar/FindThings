import React from "react"
import "./feedback-list.style.css"
import { Feedback } from "./feedback"

export const FeedbackList = (props) =>{
    return <div className="feedback-list">
        {/**
              *   Reusable component to display the items as card list
              */
        props.feedbacks.map(feedback => (
            <Feedback feedback={feedback} key={feedback.shopId}/>
        ))}
    </div>
}