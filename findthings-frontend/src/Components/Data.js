import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Data({data}){

    //To print the items present in the seller's pantry
    const col = data[0] && Object.keys(data[0]);

    return(
         //Displaying the item in a table
        <div style={{marginLeft:"10px", marginRight:"10px"}}>
                <Table>
                    <thead>{/*looping through the headers to print headings */}
                        <tr>{data[0] && col.map((heading) => <th className="col-sm-3">{heading}</th>)}<th className="col-sm-2">Order</th></tr>
                    </thead>
                    <tbody>{/*Looping through the data body to print the items*/}
                        {data.map(row => <tr>
                            {
                                col.map(column => <td>{row[column]}</td>)
                            }
                            <td><Button href="#" variant="outline-primary">Add</Button></td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
    )

}