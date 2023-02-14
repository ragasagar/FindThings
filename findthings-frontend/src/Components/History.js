import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { get } from '../Services/Apicall';
import { HistoryList } from './history_cards/history-list'
import "./Header.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

/**      
 *       @component History:
     *   This function will show the History of buyer an dthe seller depending on the role.
     *   Another component HistoryList will be called to display the order history in the card list style.
     */
function History(props) {
    
    const [data, setData] = useState([])//to set the data values
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [clazzName, setClazzName] = useState("")//to set the data values
    const [shops, setShops] = useState([])

    let history = useHistory();

    /** useEffect function:
     *  If user is buyer then order history of the buyer will be displayed.
     *  If user is seller then order history of the seller will be displayed.
     */
    useEffect(() => {
    
        if (!user) {
            history.push('/home')
        }
        else if (user.role == "USER") {
            //If user is buyer then order history of the buyer will be displayed.
            get('http://localhost:8090/orders/users/' + user.id)
                .then((resp) => resp.json())
                .then((json) => {
                    setData(json);
                    console.log("reponse", json)
                    if (data.length < 0) {
                        alert("No previous orders")
                        history.push('./buyer')
                    }

                });
                
                //Getting the shop details
                get("http://localhost:8090/users/shops")
                .then(res => res.json())
                .then(res => {
                    setShops(res)
                    console.log(shops);
                }).catch(err=> alert(err));

        }
        else if (user.role == "SELLER") {
            //If user is seller then order history of the seller will be displayed.
            get('http://localhost:8090/orders/shops/' + user.shop.shopId + "/history")
                .then((resp) => resp.json())
                .then((json) => {
                    setData(json);
                    console.log("reponse", json)
                    if (data.length < 0) {
                        alert("No previous orders")
                        history.push('./seller')
                    }

                });
        }

       
    }, []);

    return (
        <div className="container conainter-fluid">
            <br />
            <center>
                <h2>Order History</h2>

                {user ? <HistoryList orders={data} type={user.role} status="COMPLETE" shops={shops} /> : history.push('/home')}

            </center>
        </div>

    )
}
export default History