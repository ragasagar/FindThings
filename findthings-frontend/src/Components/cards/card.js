import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { put } from "../../Services/Apicall";
import "./card.style.css"

/**
 *    @Component Card:
    * Will display the products available in the seller's shop in card format.
    */
export function Card({ item, key }) {
    
    const [stock, setStocks] = useState(item.stocks);
    const [temp, setTemp] = useState(0);


     /**  update function:
        * Will be called of the seller decide to update stocks of a product and click on the update stocks button.
        * This function will put the update stocks request, updating the stocks in the database
       */
    function update() {
       
        var request = JSON.parse(JSON.stringify(item))
        request.stocks = temp
        let user = JSON.parse(localStorage.getItem('user-info'))

        try {//Puting the updated stocks in the databse

            put("http://localhost:8090/items/shops/" + user.shop.shopId, request)
                .then((resp) => {
                    resp.json().then((resp) => {
                        setStocks(temp);
                        alert("Update Sucessfully")
                        setTemp(0)
                    })

                }).catch(err => alert(err));

        } catch (error) {
            alert("Error while updating")
        }

    }

    return (<div className="card-container grid grid-rows-3 mx-2">
        <div className="grid grid-rows-2 py-2">
        <h2 className="font-semibold">{item.name}</h2>
        <div>
        <span className="pr-2">Stocks: {stock}</span>
        <span>Price:{item.price}</span>
        </div>
        </div>
        <input type="number" placeholder="Enter stocks" min={0} className="form-control focus:bg-blue-50" value = {temp} onChange={(e) => setTemp(e.target.value)} />
        <Button className="button" variant="outline-success" onClick={update}>Update Stocks</Button>
    </div>);
}