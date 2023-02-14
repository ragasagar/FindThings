import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { get } from '../Services/Apicall';
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";

class Header extends Component {
  /**
  *   Customised and responsive header will be displayed for the buyer and the seller.
  *   There will be no Notification icon if the user is buyer.
  *   Notification icon will be showed if the user is seller.
  */

  constructor(props) {
    super();
    this.timer = null;
    this.state = {
      user: null,
      orderItems: [],
      orderCount: 0,
      navItemState: false,
    }
  }

  navItemsHandler = () => {
    this.setState({
      navItemState: !this.state.navItemState
    })

    console.log(this.state.navItemState);

  };


  /** componentDidMount function:
  *   Will set the state of the user and get the user information from the local storage.
  *   If user is logged in as the seller it will set the timer to 2000ms
  */
  componentDidMount() {
  
    this.setState({
      user: JSON.parse(localStorage.getItem('user-info'))
    })
    let logged = JSON.parse(localStorage.getItem('user-info'));

    if (logged && logged.role === "SELLER") {
      this.timer = setInterval(() => this.getItems(), 2000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      this.timer = null;
    } // here...
  }


  /**   getItems function:
    *   This function will fetch the order specific to the shop id and set the states.
    */
  getItems() {
    
    if (this.state.user && this.state.user.shop) {
      get("http://localhost:8090/orders/shops/" + this.state.user.shop.shopId)
        .then(result => result.json())
        .then(result => this.setState({
          orderItems: result,
          orderCount: result.length
        }));
    }
  }

   
  /**   onLogout function:
    *   This function will be called if logout button is clicked.
    *   It will remove the session of the user.
    */
  onLogout = () => {
   
    localStorage.removeItem('user-info');
    localStorage.removeItem('token');
    this.setState({
      user: null
      // isLogout : true
    })
    this.props.history.push('/login')
  }


  render() {
    console.log(this.state.user)
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to='/home'><span style={{ color: "blue" }} className="bg-transparent">F</span><span style={{ color: "green" }} className="bg-transparent">i</span>
          <span style={{ color: "purple" }} className="bg-transparent">n</span><span style={{ color: "red" }} className="bg-transparent">d</span>
          <span style={{ color: "maroon" }} className="bg-transparent">T</span><span style={{ color: "teal" }} className="bg-transparent">h</span>
          <span style={{ color: "orange" }} className="bg-transparent">i</span><span style={{ color: "turquoise" }} className="bg-transparent">n</span>
          <span style={{ color: "pink" }} className="bg-transparent">g</span><span style={{ color: "blue" }} className="bg-transparent">s</span></NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Customised home button for seller, user and visitor */}

            {
              !this.state.user ? <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
              </li> : this.state.user.role == "USER" ?
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/buyer">Home</NavLink>
                </li>
                : this.state.user.role == "SELLER" ?
                  <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/seller">Home</NavLink>
                  </li>
                  : <li className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
                  </li>
            }
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">Orders</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/feedback">Feedback</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
          </ul>
          <div style={{ align: "left", padding: "0 40px" }}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                this.state.user && this.state.user.role === "SELLER" ?
                  <li className="nav-item">
                    <a className="nav-link notif" href="/sellers/orders">{this.state.orderCount > 0 ? <span className="num">{this.state.orderCount}</span> : ""}</a>
                  </li>
                  : ""
              }
              {
                this.state.user ? <Button className="btn" variant="outline-danger" onClick={this.onLogout} >Logout</Button> : <Button href="/login" variant="outline-success" style={{ marginLeft: "0" }}>Login</Button>
              }
            </ul>
          </div>
        </div>
        <div className="h-10 w-14 bg-transparent border-2 border-white rounded-lg items-center justify-center grid cursor-pointer self-center mr-4 lg:hidden" onClick={this.navItemsHandler}>
          <div className="w-10 h-1 bg-white border rounded-lg"></div>
          <div className="w-10 h-1 bg-white border rounded-lg"></div>
          <div className="w-10 h-1 bg-white border rounded-lg"></div>
        </div>
      </div>
      {this.state.navItemState && <div className="flex px-2 py-0 flex-wrap w-11/12 lg:hidden xl:hodden">
        <ul className="grid grid-rows-5 w-full">

          {
            !this.state.user ? <li className="nav-item border-b-2">
             <NavLink className="nav-link active text-white" aria-current="page" to="/home">Home</NavLink>
            </li> : this.state.user.role == "USER" ?
              <li className="nav-item border-b-2">
                <NavLink className="nav-link active text-white" aria-current="page" to="/buyer">Home</NavLink>
              </li>
              : this.state.user.role == "SELLER" ?
                <li className="nav-item border-b-2">
                  <NavLink className="nav-link active text-white" aria-current="page" to="/seller">Home</NavLink>
                </li>
                : <li className="nav-item border-b-2">
                  <NavLink className="nav-link active text-white" aria-current="page" to="/home">Home</NavLink>
                </li>
          }
          <li className="nav-item border-b-2">
            <NavLink className="nav-link text-white" to="/about">About</NavLink>
          </li>
          <li className="nav-item border-b-2">
            <NavLink className="nav-link text-white" to="/orders">Orders</NavLink>
          </li>
          <li className="nav-item border-b-2">
            <NavLink className="nav-link text-white" to="/feedback">Feedback</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/profile">Profile</NavLink>
          </li>
          {
            this.state.user && this.state.user.role === "SELLER" ?
              <li className="nav-item">
                <a className="nav-link notif" href="/sellers/orders">{this.state.orderCount > 0 ? <span className="num">{this.state.orderCount}</span> : ""}</a>
              </li>
              : ""
          }

          <li className="nav-item">
            {
              this.state.user ? <Button className="btn mx-3 my-2" variant="outline-danger" onClick={this.onLogout} >Logout</Button> : <Button href="/login" className="mx-3 my-2" variant="outline-success" style={{ marginLeft: "0" }}>Login</Button>
            }
          </li>
        </ul>
      </div>}
    </nav>

  }
}


export default withRouter(Header);