import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from '../Services/Apicall';

/**     
 *      @component Login:
    *   Buyer and seller will have same login page.
    *   Based on their login information they will be directed to their respective dashboards
    */
export default function Login() {
    
    const [username, setUsername] = useState("");//To set username value
    const [pass, setPass] = useState("");//To set password value

    let history = useHistory();


    /** submit function:
    *  When login form is submit this function will be invoked
    *  This will fetch the information of the user and push the user on their respective dashboard 
    *  according to their role
    */
    async function submit(e) {//When login form is submited this function will be invoked
        e.preventDefault();
        if (!username || !pass) {
            alert("Email or Password cannot be blank");
        }
        else {
            //Dummy data...need to check from the database
            let result;
            localStorage.setItem('token', btoa(username + ":" + pass))
            get("http://localhost:8090/users/auth/login")
                .then(result => result.json())
                .then(response => {
                    localStorage.setItem("user-info", JSON.stringify(response))
                    result = response;
                    if (result && result['role'] === 'USER')
                        history.push('/buyer')
                    else if (result && result['role'] === 'SELLER')
                        history.push('/seller')
                }).catch(err => {
                    alert(err);
                });
            //Sending logger to their respective dashboard with repect to the user values

        }
    }
    return (
        <center>
            <div className="container rounded-xl z-10 md:w-4/5 shadow-lg mt-16 lg:w-9/12" style={{ backgroundColor: "#F5F5F5" }}>
                <h2 className="text-green-600 font-semibold text-xl my-2">Login to continue</h2>
                <form>{/*Login form */}
                    <div className="mb-3 ">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control focus:bg-blue-50" id="username" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Password</label>
                        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="form-control focus:bg-blue-50" id="pass" />
                    </div><br />
                    <button className="btn btn-sm btn-success text-lg hover:text-green-600 hover:bg-white" style={{ height: "35px", width: "80px" }} onClick={submit}>Login</button>
                </form>
                <br />
                <h5 className="my-3">Don't have an account?</h5>{/*In case user doesn't have an account and want to sign up */}
                <a href="/signupbuyer"className="text-lg hover:text-red-600">SignUp for buyer</a> &nbsp;&nbsp;&nbsp;<a href="/signupseller"className="text-lg hover:text-red-600">SignUp for seller</a>
                <br /><br />
            </div>
        </center>
    )
}