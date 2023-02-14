import React from 'react'
import { useState, useEffect } from 'react'
import { get } from '../Services/Apicall';
import {FeedbackList} from './feedback_cards/feedback-list'

require("es6-promise").polyfill();
require("isomorphic-fetch");

 /**     
  *      @component ShowFeedbacks
     *   This function will show shop feedbacks to the buyer on their homepage once they click on Get Quote button
     *   It will call another component FeedbackList to show the feedbacks in card form
     */
function ShowFeedbacks(props) {
   
    const [data, setData] = useState([])//to set the data values
    let user = JSON.parse(localStorage.getItem('user-info'))

    useEffect(()=>{//Fetching the feedbacks
        console.log(user)
        //console.log(user.shop.shopId)
        get('http://localhost:8090/feedbacks/'+ props.id)
        .then((resp) => resp.json())
        .then((json) => {setData(json);
                console.log("reponse:", data);

            });
    }, []);

    return (
        <div>
            <br/>
            <center>
            <FeedbackList feedbacks={data}/>

            </center>

        </div>

    )
}
export default ShowFeedbacks