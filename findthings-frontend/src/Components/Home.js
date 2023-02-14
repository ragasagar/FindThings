import React from 'react'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

/**      
 *       @component Home:
     *   This component will show the tagline of the product, signup links for buyer and seller and common login link.
     */
export default function Home() {
    
    let user = JSON.parse(localStorage.getItem('user-info'))
    let history = useHistory();

    return (//Home page for the buyer and seller
        <center>
            <br/><br/>
            <div className="container my-3 w-full rounded-xl z-10 md:w-4/5 shadow-lg mt-56"  style={{backgroundColor:"#F5F5F5"}}>
                <h1><span style={{color:"blue"}} className="bg-transparent">F</span><span style={{color:"green"}} className="bg-transparent">i</span>
                <span style={{color:"purple"}} className="bg-transparent">n</span><span style={{color:"red"} } className="bg-transparent">d</span>
                <span style={{color:"maroon"}}className="bg-transparent">T</span><span style={{color:"teal"}}className="bg-transparent">h</span>
                <span style={{color:"orange"}}className="bg-transparent">i</span><span style={{color:"turquoise"}}className="bg-transparent">n</span>
                <span style={{color:"pink"}}className="bg-transparent">g</span><span style={{color:"blue"}}className="bg-transparent">s</span></h1>
                <h6>Find everything at one place!</h6><br/><br/>
                <div style={{backgroundColor:"#F5F5F5"}}>
                    <br/>
                    <p>Compare prices of items between different stationeries 
                    and buy everything at a reasonable price and pick them 
                    up at your chosen time.</p><br/>
                </div><br/>
                <Button className="btn" variant="outline-success" href="/login">Login</Button><br/>
                or<br/>
                <Button className="btn" variant="outline-success" href="/signupbuyer">SignUp for Buyer</Button> &nbsp; &nbsp;
                <Button className="btn" variant="outline-success" href="/signupseller">Signup for Seller</Button><br/><br/>
            </div>
        </center>
    )
}