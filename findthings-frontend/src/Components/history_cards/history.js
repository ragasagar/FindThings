import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { put } from "../../Services/Apicall";
import "./history.style.css"
import { useHistory } from 'react-router-dom';
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";

 /**
  *  @component History
  *  To show the order history for both buyer and the seller.
  * If user is seller then they will be able to reject or accept the orders
  * If the user is buyer then they will be able to see the details of the order and location of the shop.
  *  
  */
export function History({ order, key, type, acceptOrder, rejectOrder, status, shops }) {
    
    const [clazzName, setclazzName] = useState("ShowDetails")
    const [d, setD] = useState(order.status)
    let user = JSON.parse(localStorage.getItem('user-info'))
    let history = useHistory();

    let user_loc = JSON.parse(localStorage.getItem("user-loc"));

    useEffect(() => {

    })


    function showDetail() {
        //To hide and unhide the details of the order
        console.log(order.items);
        if (clazzName === "ShowDetails") {
            setclazzName("HideDetails")
        } else {
            setclazzName("ShowDetails")
        }
        console.log(clazzName);
    }

    function completeOrder() {
        //To set the order status and put the order request into the dtabase if the order is completed
        let orderRequest = order;
        orderRequest.status = "COMPLETED";
        put("http://localhost:8090/orders", orderRequest)
            .then((resp) => {
                resp.json().then((resp) => {
                    alert("Update successfully");
                    order.status = orderRequest.status;
                    setD(orderRequest.status)
                })

            }).catch(err => alert(err));

    }

    let url = ""
    if (type == "USER" && shops.length > 0) {
        if (user.role == "USER") {
            console.log(shops);
            let address = shops.filter(shop => shop.shopId === order.shopId)[0].address
            address = address.split(" ").join("+").split(",").join("")

            // console.log(address);
            //To show the destination of the shops to the  buyer if they click on the location button
            if (user_loc) {
                url = "https://www.google.com/maps/dir/?api=1&origin=" + user_loc.lat + "," + user_loc.long + "&destination=" + address;
            }
        }
    }

    return (
        <div className="history-container container">
            <div className="row">
                <div className="col col-lg-4">
                    <h3>ShopId:OrderId</h3>
                </div>
                <div className="col col-lg-4">
                    <p>Total Price</p>
                </div>
                <div className="col col-lg-4"></div>
            </div>
            <div className="row">
                <div className="col col-lg-4">
                    <h2>{order.shopId}:{order.orderId}</h2>
                </div>
                <div className="col col-lg-4">
                    <p>{order.totalPrice}</p>
                    <p>
                        <DateTimePicker
                            value={new Date(order.time)}
                            format="yyyy-MM-dd h:mm:ss"
                            required="true"
                            disabled={false}
                        /></p>
                </div>
                <div className="col col-lg-4">
                    {(type == "USER") ?
                        <div>
                            <h3><p>{order.status}</p></h3>

                            <div><a href="/feedback">Feedback</a></div>
                            <div><a href={url}
                                target="_blank">location</a></div>
                        </div>
                        :
                        <div className="col col-lg-4">
                            <h3><p>{order.status}</p></h3>
                            {
                                status != "COMPLETE" ?
                                    <>
                                        <Button className="button" variant="outline-primary" onClick={acceptOrder} id={order.orderId} >Accept Order</Button>
                                        <Button className="button" variant="outline-danger" onClick={rejectOrder} id={order.orderId} >Reject Order</Button>
                                    </>
                                    :
                                    d != "COMPLETED" && d != "REJECTED" ?
                                        <Button className="button" variant="outline-success" onClick={completeOrder}>Complete Order</Button>
                                        :
                                        ""
                            }
                        </div>
                    }
                </div>

            </div>
            <div className="App">
                <a onClick={showDetail} className="btn btn-link">{clazzName}</a>
                <div id="secondhistorydiv" className={clazzName}>
                    {
                        order.items.map(data =>

                            <div>
                                <div className="row">
                                    <div className="col col-lg-4">
                                        <p>{data.name}</p>
                                    </div>
                                    <div className="col col-lg-4">
                                        <p>{data.price}</p>
                                    </div>
                                    <div className="col col-lg-4">
                                        <p>{data.size}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}