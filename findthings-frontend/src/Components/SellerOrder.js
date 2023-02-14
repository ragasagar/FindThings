import React, { Component } from 'react'
import { get, put } from '../Services/Apicall';
import { HistoryList } from './history_cards/history-list'
import "./Header.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

class SellerOrder extends Component {
    /**
     *   This component will show the New orders arrived of the seller
     *   It will fetch all the relevant data(i.e., Orders).
     *   Contains all the main functions required for the seller Notification page
     */

    constructor() {
        super();
        this.state = {
            data: [],
            user: JSON.parse(localStorage.getItem('user-info'))
        }

    }


    /**  componentDidMount():
     *   If user is buyer then they will be redirected to the buyer page.
     *   If User is seller then it will fetch all the active ordes for the respective shop id.
     */
    componentDidMount() {
    
        if(!this.state.user)
        {
            this.props.history.push("/home")
        }
        else if (this.state.user.role === "USER") {
            this.props.history.push("/buyers");
        }
        else{
            get('http://localhost:8090/orders/shops/' + this.state.user.shop.shopId)
            .then((resp) => resp.json())
            .then((json) => {
                console.log("Hello")
                this.setState ({
                    data : json
                })
            });
        }
    }

     /** acceptOrder function:
     *   This function will be invoked when seller clicks on the accept order button.
     *   And it will call another function uodateOrder to update the set of the data.
     */
    acceptOrder = (e) => {
   
        let orderRequest = this.state.data.filter(order => order.orderId == e.target.id)[0];
        orderRequest.status = "ACCEPTED";
        this.updateOrder(orderRequest);
    }

    /**  rejectOrder function:
     *   This function will be invoked when seller clicks on the reject order button.
     *   And it will call another function uodateOrder to update the set of the data.
     */
    rejectOrder = (e) => {
    
        let orderRequest = this.state.data.filter(order => order.orderId == e.target.id)[0];
        orderRequest.status = "REJECTED";
        console.log(this.state.data.indexOf(orderRequest));
        this.updateOrder(orderRequest);
    }

    /**  updateOrder function:
     *   This function will be invoked either when seller clicks on the accept order button or reject order button.
     *   And it will set the state of the data.
     */
    updateOrder (request) {
    
        console.log(request);
        put("http://localhost:8090/orders", request)
            .then((resp) => {
                resp.json().then((resp) => {
                    let temp = this.state.data;                    
                    temp.splice(temp.indexOf(request), 1);
                    this.setState ({
                        data:temp
                    })
                })

            }).catch(err => alert(err));

    }

    /**  render fucntion:
     *   This will render the basic layout.
     *   Will show the orders in form cards with accept and reject order buttons
     */
    render() {
     
        let items = this.state.data;
        return (
            <div className="container">
                <br />
                <center>
                    <h2>Orders</h2>

                    {this.state.data.length > 0 ?
                        <HistoryList orders={this.state.data} type="SELLER" acceptOrder={this.acceptOrder} rejectOrder={this.rejectOrder} /> :
                        <div className="my-5 col-sm-4 history-container" ><h3 style={{color:"red"}}>No New Orders</h3></div>
                    }
                </center>

            </div>

        )
    }
}
export default SellerOrder