import React from 'react'
import "./profile.css"
import img1 from "../Assets/image1.png";

/**      
 *       @component Profile
     *   Profile Component used to show profiles of the user like their role, name, email.
     *   We will also store user details and display it accordingly
     */
export default function Profile() {
    
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);

    return (
        <div className="divBody">
            <div className="container  emp-profile" style={{width:"60%"}}>
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={img1} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {user.name}
                                </h5>
                                <h6>
                                    {user.role}
                                </h6>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.id}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>UserName</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.userName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.name ? user.name : user.shop.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Role</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.role}</p>
                                        </div>
                                    </div>
                                </div>
                                {
                                    user.shop ?
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Shop</label>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{user.shop.name}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Address</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{user.shop.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}