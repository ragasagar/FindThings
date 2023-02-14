import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import { useHistory } from 'react-router-dom';
import { get, post } from '../Services/Apicall';
import ShowFeedbacks from './ShowFeedbacks';
import ReactStars from "react-rating-stars-component";

/**      
     *   @component
     *   Shows the layout of the feedback page and shows the specific Feedback page according to the user info.
     *   Main Function:
     *   Parameters required: if(user == Buyer) : Shop id and shop name, Rating given by the user, Feedback given by the user
     *   Will return: if(user == Buyer): Saves all the inputs given by the user in the table called feedback present 
     *           in the database called findthings.
     *           if(user == Seller) : Will show all the feedbacks given to the Shop by the user
     */

export default function Feedback() {
    
    const [id, setID] = useState("");//To set shop ID
    const [rate, setRate] = useState("");//Set the rating given by user
    const [feedback, setFeedback] = useState("");//Set the feedback provided by the user
    const [shopFeedback, setShopFeedback] = useState([]);
    const [shops, setShops] = useState([]);
    let history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))


    /**
     *   submit function:
     *   This function will be invokeed when the feedback form is submitted.
     *   @param - Shop id and shop name, Rating given by the user, Feedback given by the user
     *   @returns Saves all the inputs given by the user in the table called feedback present 
     *           in the database called findthings.
     */
    const submit = (e) => {
    
        e.preventDefault();
        if (!id || !rate || !feedback) {//Feedback forms take three inputs from the user
            alert("Fields cannot be blank");
        }
        else {

            //push the data into database
            let result;
            let details = { shopId: id, rate, feedback }
            post("http://localhost:8090/feedbacks", details)
                .then(response => response.json())
                .then(response => {
                    result = response;
                    alert("Feedback Submitted successfully");
                    setID(''); setFeedback(''); setRate('');
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function setShopId(e) {
        setID(e.target.value)
    }

    /**  useEffect
     *   This function will be invokeed when the feedback form is submitted.
     *   @param - User info(i.e, if user is buyer or seller)
     *   @returns if(user == Seller) : Will fetch all the feedbacks given to the Shop by the user
     */
    useEffect(() => {

        if (!user) {
            history.push('/home')
        }
        else if (user && user['role'] === "SELLER") {
            let shopId = user['shop']['shopId']
            //console.log(shopId)
            get("http://localhost:8090/feedbacks/" + shopId)
                .then(res => res.json())
                .then(res => { setShopFeedback(res) })
                .catch(err => alert("Error while fetching the respnose"));
        }
        else {
            get('http://localhost:8090/users/shops')
                .then(res => res.json())
                .then(res => { setShops(res) })
                .catch(err => alert("Error while fetching the response"));
        }


    }, [])


    /**  ratingChanged function:
     *   This function will save the ratings given by the user.
     *   @param - Will be provided by the ReactStars Component.
     *   @return Sets the rating in rate hook
     */
    const ratingChanged = (e) => {
    
        setRate(e)

    };

    if (user && user['role'] === "USER") {//If the user is buyer if part will be triggered
        return (
            <div className="container">
                <center>
                    <div className="my-3 col-sm-4" style={{ backgroundColor: "#F5F5F5" }}>
                        <br />
                        <h3>Please submit your feedback</h3>
                        <form id="review" onSubmit={submit}>{/*Feedback form to be filled by the buyer */}
                            <div className="mb-3">
                                <br />
                                <label htmlFor="id" className="form-label">Shop Name</label><br />
                                <select className="form-control" onClick={setShopId}>
                                    <option>Select Shop id and name</option>
                                    {shops.map((shop) =>
                                        <option value={shop.shopId}>{shop.shopId} : {shop.name}</option>
                                    )
                                    }
                                </select>
                            </div>
                            <div className="mb-3" style={{ alignContent: "center" }}>
                                <label htmlFor="rate" className="form-label">Rate the item between 1 to 5</label>
                                {/* Reactstars component will show interactive rating feature */}
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={rate}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="feedback" className="form-label">Feedback</label>
                                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="form-control" id="feedback" />
                            </div><br />
                            <button type="submit" className="btn btn-sm btn-success" style={{ height: "35px", width: "80px" }}>Submit</button>
                        </form>
                        <br />
                    </div>
                </center>
            </div>
        )
    }
    else {//If user is seller then else part will be invoked and it will show the feedbacks given to Seller.
        console.log(shopFeedback)
        console.log("shopId:", user.shop.shopId)
        return shopFeedback.length > 0 ? (
            <div className="container my-3 col-sm-8" style={{ backgroundColor: "#F5F5F5" }}>
                <ul>
                    {
                        <ShowFeedbacks id={user.shop.shopId} />
                    }
                </ul>
            </div>
        ) ://If no feedbacks are available for the seller
            <div className="history-container">
                <center>
                    <h3>No Feedbacks Available</h3>
                </center>
            </div>
    }
}