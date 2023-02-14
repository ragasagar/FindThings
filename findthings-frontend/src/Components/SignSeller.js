import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postUser } from '../Services/Apicall';

/**      
 *       @component SignSeller 
     *   Shows the layout of the signup page for the seller.
     *   Main Function:
     *   @param -Shop name, username, address, Password
     *   @return Saves all the inputs given by the user in the database called findthings.
     */
export default function SignSeller() {
    
    const [shop, setShop] = useState("");//To set the shop name
    const [pass, setPass] = useState("");//To set the password
    const [cpass, setCpass] = useState("");//To confirm password
    const [user, setUser] = useState("");//To set the username
    const [address, setAddress] = useState("");//To set the address

    let history = useHistory();

    /**
     *   submit function:
     *   This function will be invoked when signup button is clicked by the seller
     *   @param -shop name, username, address, Password
     *   @returns Will save the user details in the database.
     */
    async function submit(e) {
    
        e.preventDefault();
        let shopDetail = {
            "name":shop,
            "address":address
        }
        let details = {userName:user,password:pass,shop:shopDetail, role: "SELLER", enabled:true, }
        if (!shop || !pass || !cpass || !user || !address) {//Checking if fields are not empty
            alert("Fields cannot be blank");
        }
        else 
        {
            if(pass !== cpass)
                alert("Passwords don't match");
            else
            {  //push the data into database
                let result;
                postUser("http://localhost:8090/users", details)
                    .then(response =>response.json())
                    .then(response=> {
                        result = response;
                        alert("Sign Up successfully");
                        history.push('/login');
                    })
                    .catch(err => {
                        console.log(err.json())
                    })
            
            }
        }
    }
    return (
        <center>
        <div className="container rounded-xl z-10 md:w-4/5 shadow-lg mt-16 lg:w-9/12" style={{backgroundColor:"#F5F5F5"}}>
            <h3 className="text-green-600 font-semibold text-xl my-2">SignUp Page for Seller</h3><br/>
            <form>{/*Sign up form */}
                <div className="mb-4">
                    <label htmlFor="user" className="form-label">Username</label>
                    <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="form-control focus:bg-blue-50" id="user" aria-describedby="emailHelp" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Shop Name</label>
                    <input type="text" value={shop} onChange={(e) => setShop(e.target.value)} className="form-control focus:bg-blue-50" id="shop" aria-describedby="emailHelp" />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control focus:bg-blue-50" id="address" aria-describedby="emailHelp"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control focus:bg-blue-50" id="pass" />
                </div>
                <div className="mb-4">
                    <label htmlFor="cpass" className="form-label">Confirm password</label>
                    <input type="password" value={cpass} onChange={(e) => setCpass(e.target.value)} className="form-control focus:bg-blue-50" id="cpass" />
                </div>
                
                <br/>
                <button type="submit" className="btn btn-sm btn-success text-lg hover:text-green-600 hover:bg-white" style={{height:"35px", width:"80px"}} onClick={submit}>SignUp</button>
            </form>
            <br/>
        </div></center>
    )
}