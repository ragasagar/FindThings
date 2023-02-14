import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { post, put } from "../../Services/Apicall";
import "./feedback.style.css"
import { useHistory } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

/**
 *    @component Feedback(inline in for buyer)
  *   This component will show the feedbacks given by the user when the buyer clicks on the feedback button 
  *  appears when the buyer clicks on get Quote button after ordering.
  */
export function Feedback({ feedback, key }) {
    
    const [clazzName, setclazzName] = useState("ShowDetails")
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [d, setD] = useState({})
    let history = useHistory();

    return (
        <div className="feedback-container container">
            <div className="row">
                <div className="col col-lg-4">
                    <h2>ShopId</h2>
                </div>
                <div className="col col-lg-4">
                    <p>Rating</p>
                </div>
                <div className="col col-lg-4">
                    <p>Feedback</p>
                </div>
            </div>
            <div className="row">
                <div className="col col-lg-4">
                    <h2>{feedback.shopId}</h2>
                </div>
                <div className="col col-lg-4">
                    {/* <p>{feedback.rate}</p> */}
                    <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={15}
                        activeColor="#ffd700"
                        value={feedback.rate}
                        edit={false}
                    />
                </div>
                <div className="col col-lg-4">
                    <p>{feedback.feedback}</p>
                </div>
            </div>
        </div>
    );
}