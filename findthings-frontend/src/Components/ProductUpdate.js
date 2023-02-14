import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { post } from '../Services/Apicall';

require("es6-promise").polyfill();
require("isomorphic-fetch");

 /**     
  *      @componet ProductUpdate:
     *   This component will update the products of the seller.
     *   @param - name of the product, stocks available, price of the product
     *   @return Will save all these details in the dataabse findthings
     */
function ProductUpdate() {
   
    const [name, setName] = useState("");//To set product name value
    const [stocks, setStocks] = useState("");//To set stocks
    const [price, setPrice] = useState("");//To set price
    let history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))//Getting user-info

    if(!user)
    {
        history.push('/login')
    }


    /**  submit function:
     *   When login form is submited this fucntion will be invoked.
     *   And will post the data given by the suer into the database
     */
    function submit(e) {
    
        e.preventDefault();
        if (!name || !price || !stocks) {
            alert("fields cannot be blank");
        }
        else {
            let result;
            let details = { shopId: user.shop.shopId, name, price, stocks }
            post("http://localhost:8090/items", details)
                .then(response => response.json())
                .then(response => {
                    result = response;
                    alert("Product added successfully");
                    setName(''); setStocks(''); setPrice('');
                })
                .catch(err => {
                    console.log(err)
                })
            //Sending logger to their respective dashboard with repect to the user values

        }
    }

    return (
        <center>
        <div className="container col-sm-4 w-full rounded-xl z-10 md:w-4/5 shadow-lg mt-28" style={{ backgroundColor: "#F5F5F5" }}>
            <h3 className="text-lg my-3 font-semibold text-green-600">Product details</h3>
            <form>{/*Login form */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Product name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control focus:bg-blue-50" id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="stocks" className="form-label">Stocks</label>
                    <input type="text" value={stocks} onChange={(e) => setStocks(e.target.value)} className="form-control focus:bg-blue-50" id="stocks" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control focus:bg-blue-50" id="price" />
                </div>
                <br />
                <Button variant="success" onClick={submit}>Add Product</Button>
            </form>
            <br /><br />
        </div>
    </center>

    )
}
export default ProductUpdate