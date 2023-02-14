import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from 'react-router-dom';
import { post } from "../../Services/Apicall";
import ShowFeedbacks from '../ShowFeedbacks';
import "./item.style.css";


  /**
   * @component Item
  *  Main functionality of the buyer page. Will take the input and process it as required.
  *  
  */
export default function Item({ item, key }) {
  
    const [clazzName, setclazzName] = useState("ShowDetails")
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [d, setD] = useState({});
    const [show, setShow] = useState(false);
    const [datetime, setDatetime] = useState(new Date());
    const [totalPrice, setTotalPrice] = useState(item.totalPrice);
    const [qty, setQty] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clazzFeedback, setclazzFeedback] = useState("ShowFeedbacks")
    let history = useHistory();


/**
  *   This function will be invoked when the buyer clicks on the order button.
  *  @returns will post the user's order request to the database
  */
    function order() {
       
        //console.log(item.items)
        if (totalPrice == 0) {
            alert("Select item");
        } else {
            let itemList = []
            item.items.forEach(element => {
                let itemRequest = {
                    name: element.name,
                    price: element.price,
                    cost: element.price,
                    size: qty[element.name] ? qty[element.name] : 1
                }
                itemList.push(itemRequest)
            })
            console.log(qty);

            let request = {
                items: itemList,
                buyerId: user.id,
                shopId: item.shopId,
                time: datetime.toISOString(),
                totalPrice: totalPrice,
                status: "ORDERED"
            }

            console.log(request);//Posting the request to the database
            post('http://localhost:8090/orders', request)
                //.then(resp => resp.json)
                .then((resp) => {
                    resp.json().then((resp) => {
                        setD(resp);
                        setShow(false);
                        alert("Ordered Successfully");
                        history.push("/orders");
                    })
                        .catch(error => alert(error))
                });
        }
    }

    /**
  *   This function will be invoked when the buyer clicks on the showDetails button.
  *   This will Hide and unhide the showdetail component
  */
    function showDetail() {
        //Hide and unhide the showdetail component
        console.log(item.items);
        if (clazzName === "ShowDetails") {
            setclazzName("HideDetails")
        } else {
            setclazzName("ShowDetails")
        }
        console.log(clazzName);
    }

     /**
  *   This function will be invoked when the buyer clicks on the showFeedbacks button.
  *   This will Hide and unhide the showfeedback component
  */
    function showFeedback() {
        //Hide and unhide the feedbacks of the shops
        if (clazzFeedback === "ShowFeedbacks") {
            setclazzFeedback("HideFeedbacks")
        } else {
            setclazzFeedback("ShowFeedbacks")
        }
        console.log(clazzFeedback);
    }

     /**
  *   This function will be invoked when the buyer changes the quantity of the product.
  *   This will set the quantity of the products entered by the buyer
  */
    function setQuantities(e) {
        //To set the quantity of the products entered by the buyer
        let temp = qty;
        temp[e.target.id] = e.target.value
        setQty(temp)
        let total = 0;
        item.items.forEach(i => {
            if (qty[i.name]) {
                total = total + i.price * qty[i.name];
            } else {
                total = total + i.price * 1;
            }
        })
        setTotalPrice(total);
    }


    return (
        <div className="item-container container">
            <div className="row">
                <div className="col col-lg-4">
                    <h2>ShopId</h2>
                </div>
                <div className="col col-lg-4">
                    <p>Total Price</p>
                </div>
            </div>
            <div className="row">
                <div className="col col-lg-4 col-sm-4">
                    <h2>{item.shopId}</h2>
                </div>
                <div className="col col-lg-4 col-sm-4">
                    {totalPrice ? <p>{totalPrice}</p> : <p>{item.price}</p>}
                </div>
                <div className="col col-lg-4 col-sm-4">
                    <Button className="button" variant="outline-success" onClick={() => setShow(true)}>Order</Button><br />
                    <a onClick={showFeedback} className="btn btn-link" left>{clazzFeedback}</a>
                    <div id="feedbackdiv" className={clazzFeedback}>
                        <ShowFeedbacks id={item.shopId} />
                    </div>
                </div>
            </div>
            <div className="App">
                <a onClick={showDetail} className="btn btn-link" left>{clazzName}</a>
                <div id="seconddiv" className={clazzName}>
                    {
                        item.items.map(data =>

                            <div>
                                <div className="row">
                                    <div className="col col-lg-4">
                                        <p>{data.name}</p>
                                    </div>
                                    <div className="col col-lg-3">
                                        <p>{data.price}</p>
                                    </div>
                                    <div className="col col-lg-5">
                                        <label >Qty
                                            <input type="number" className="form-control" value={qty[data.name]} placeholder={1} onChange={setQuantities} id={data.name} min={0}></input>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div>
                {/* To show the the DateTimePicker component when buyer decides to order items */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Order Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Select Date and time for your pickup.</p>
                        <br />
                        <DateTimePicker
                            onChange={setDatetime}
                            value={datetime}
                            format="yyyy-MM-dd h:mm:ss a"
                            required="true"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={order} variant="success">Order</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}