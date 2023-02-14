import React from 'react'
import { useState, useEffect } from 'react'
import DataSeller from './DataSeller'
import { useHistory } from 'react-router-dom';
import { get } from '../Services/Apicall';
import { SearchBox } from './cards/search';
import { CardList } from './cards/card-list';
import { Button } from "react-bootstrap";

require("es6-promise").polyfill();
require("isomorphic-fetch");

/**    
 *     @component Seller
    *  This component will fetch the seller data from the database using the shopId.
    *  This will display the items available in the seller's shop in card format.
    */
function Seller(props) {
    
    const [data, setData] = useState([])//setting the data values
    const [q, setQ] = useState("")//Setting the search values
    let history = useHistory();
    let user = JSON.parse(localStorage.getItem('user-info'))

/**    useEffect function:
    *  This fucntion will fetch the seller data from the database using the shopId.
    *  If data is not present then an alert will be shown "Error while fetching the items."
    */
    useEffect(() => {

        if(!user)
        {
            history.push('/home')
        }
        else if(user.role == 'SELLER')
        {
        get('http://localhost:8090/items/?shopId='+ user.shop.shopId)//Fetching data from the api
            .then(response => response.json())
            .then((json) => {setData(json);
                if(!window.location.hash) {
                    window.location = window.location + '#loaded';
                    window.location.reload();
                }
            })
            .catch(() => alert("Error while fetching the items"));
        }
        else
            history.push('/buyer')

    }, [])


    const items = data.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
    return (
        <>
        <div style={{marginLeft:"20px", marginTop:"10px"}}>
        <Button href="./updateproducts" variant="success"className="fixedButton btn-primary" style={{position:"fixed", 
          bottom:" -4px",right: "10px"}}>Add Product</Button>
        </div>
        <div style={{marginLeft:"20px"}}>
            <br />{/*Search bar and logout option*/}
            <SearchBox placeholder="Search Items"
                handleChange={(e) => setQ(e.target.value)}
            />
            <CardList items={items}/>
        </div>
        </>

    )
}
export default Seller