import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postUser } from '../Services/Apicall';


/**      
 *       @component SignBuyer 
     *   This function will be invoked when signup button is clicked by the seller
     *   @input name, email, username, address, Password
     *   @output Will save the user details in the database.
     */
export default function SignBuyer() {
    
    const [name, setName] = useState("");//To set the name of the buyer
    const [email, setEmail] = useState("");//To set the email of the buyer
    const [address, setAddress] = useState("");//To set theaddress of the buyer
    const [password, setPass] = useState("");//To set the password of the buyer
    const [cpass, setCpass] = useState("");//To confirm password
    const [userName, setUsername] = useState("");//To set username
    const [role, setRole] = useState("USER");//To set role

    let history = useHistory();

     /**
     *   This function will be invoked when signup button is clicked by the seller
     *   @param - Shop name, username, address, Password
     *   @return Will save the user details in the database.
     */
    async function submit(e) {
   
        e.preventDefault();
        let details = { name, email, address, password, userName, role, enabled: true}
        if (!name || !userName || !email || !password || !cpass) {//Checking if any field is empty
            alert("Fields cannot be blank");
        }
        else {
            if (password !== cpass)
                alert("Passwords don't match");
            else {  //push the data into database
                let result;
                postUser("http://localhost:8090/users", details)
                    .then(response =>response.json())
                    .then(response=> {
                        result = response;
                        alert("Sign Up successfully");
                        history.push('/login');
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
    return (
        <center>
            <div className="container rounded-xl z-10 md:w-4/5 shadow-lg mt-16 lg:w-9/12" style={{ backgroundColor: "#F5F5F5" }}>
                <h3 className="text-green-600 font-semibold text-xl my-2">SignUp Page For Buyer</h3>
                <form onSubmit={submit}>{/*Sign up form */}
                    <div className="mb-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control focus:bg-blue-50" id="name" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} className="form-control focus:bg-blue-50" id="username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                            {/* <span className="input-group-text " id="email"></span> */}
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control focus:bg-blue-50" id="email" aria-describedby="emailHelp" />
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control focus:bg-blue-50" id="address" aria-describedby="emailHelp"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPass(e.target.value)} className="form-control focus:bg-blue-50" id="pass" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cpass" className="form-label">Confirm password</label>
                        <input type="password" value={cpass} onChange={(e) => setCpass(e.target.value)} className="form-control focus:bg-blue-50" id="cpass" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-sm btn-success text-lg hover:text-green-600 hover:bg-white" style={{ height: "35px", width: "80px" }}>SignUp</button>
                </form>
                <br />
            </div></center>
    )
}