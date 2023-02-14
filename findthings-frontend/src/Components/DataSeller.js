import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react'

export default function Data({data}){
/**
  *   Will display the items present in the Seller's shop.
  *     The item will be displayed in the card format
  */

    //To print the items present in the seller's pantry
    const col = data[0] && Object.keys(data[0]);
    //const [stocks, setStocks] = useState("")//setting the data values
    
    function setStocks(stock, key)
    {

    }

    function update(key)
    {
        console.log(key);
        //console.log(stocks);
    }

    return(
         //Displaying the item in a table
        <div style={{marginLeft:"10px", marginRight:"10px"}}>
                <Table>
                    <thead>{/*looping through the headers to print headings */}
                        <tr>{data[0] && col.map((heading) => <th className="col-sm-3">{heading}</th>)}<th className="col-sm-2">Order</th></tr>
                    </thead>
                    <tbody>{/*Looping through the data body to print the items*/}
                        {data.map(row => <tr>
                            <td>{row.userId}</td>
                            <td>{row.id}</td>
                            <td>{row.title}</td>
                            
                            <td>{row.body}</td>
                            <td>
                                <input key={row.key} type="text" placeholder="enter stocks" onChange={(e) => setStocks(e.target.value, row.key)}/><br/><br/>
                                <Button href="#" variant="outline-primary" onClick={update(row.key)}>Update Stocks</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
    )

}