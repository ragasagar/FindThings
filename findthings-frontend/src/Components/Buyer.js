import React from 'react'
import { useState, useEffect } from 'react'
import Data from './Data'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { get } from '../Services/Apicall';
import { ItemList } from '../Components/items_cards/item-list';
import { BsTrash, BsTrashFill } from "react-icons/bs";

require("es6-promise").polyfill();
require("isomorphic-fetch");

/**
  *  @component Buyer.
  *  This component will render the search bar and allow the suer to search the products,
  *  add the products to their cart, remove item from their cart, Compare the prices of different shops.
  */
function Buyer(props) {

    let user = JSON.parse(localStorage.getItem('user-info'))

    let history = useHistory();
    if (!user) {
        history.push('/home')
    }

    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

    const [data, setData] = useState([])//to set the data values
    const [q, setQ] = useState("")//To set the search results
    const [searchData, setSearchData] = useState([])
    const [noData, setNoData] = useState(false)
    const [product, setProduct] = useState([])
    const [quoteList, setQuoteList] = useState([])

/**   addItem function:
  *   Function to add items chosen by the buyer to their list
  */
    function addItem(e) {
       
        console.log(e.target.value);
        let value = product.filter(p => p === e.target.value);
        console.log(value);
        if (value.length == 0) {
            setProduct([...product, e.target.value])
            setSearchData([])
            setQ('')
        }
        setSearchData([])
        setQ('')
    }



/**   search function:
  *   Will fetched the searched items from the database
  */
    function search() {
        
        if (q) {
            get('http://localhost:8090/items/search/' + q)
                .then((data) => {
                    data.json().then((response) => {
                        //console.warn("reponse", response)
                        if (response.length > 0) {
                            setSearchData(response)
                            setNoData(false)
                        }
                        else {
                            setSearchData([])
                            setNoData(true)
                        }

                    })
                })
        }
        // else{
        //     alert('No product');
        // }
    }


/**   updateProducts function:
  *   Will update the buyer's cart if they decide to remove any item form their cart
  */
    function updateProducts(e) {
      
        console.log(e.target)
        //e.preventDefault();
        setProduct(product.filter(
            (p) => p !== e.target.getAttribute("name")
        ))
    }


/**   getQuote function:
  *   Will fetch the information about all the shops that constains the items present in the buyer's cart
  */
    function getQuote() {
       
        let value = product.join(',');
        get('http://localhost:8090/items/quote?items=' + value)
            .then((data) => {
                data.json().then((response) => {
                    //console.log("reponse", response)
                    setQuoteList(response)

                })
            })

    }

    return (
        <div className="flex justify-center">
            <div className="p-1 my-5 w-9/12 justify-center rounded-xl z-10 md:w-4/5 shadow-lg mt-16 lg:w-9/12">
                <center><div>
                    <div className="row">
                        <div className="col col-lg-3"></div>
                        <div className="col col-lg-6">
                            <SearchBar handleChange={(e) => setQ(e.target.value)} value={q} search={search} />
                            <div>
                                {
                                    searchData.length > 0 ?
                                        <div style={{ marginTop: "-20px" }}>
                                              <div><br /> {/* To display the searched items as a dwopdown list */}
                                                <select className="form-control" value={product} onChange={addItem} style={{ padding: "7px 7px 7px 7px" }}>
                                                    <option value={""}>Choose your choice</option>

                                                    {
                                                        searchData.map((item) =>

                                                            <option value={item}>{item}</option>
                                                        )
                                                    }
                                                </select>

                                            </div>
                                        </div>
                                        : <div><br /><h4></h4></div>
                                }
                                {
                                    noData ? <div><br /><h4>No products found</h4></div> : null
                                }
                            </div>
                        </div>
                        <div className="col col-lg-3"></div>
                    </div>
                </div>
                    <div><br />
                        {
                            product.length > 0 ?
                                <div>
                                    <ul> {/*To Display the selected items as list with delete button */}
                                        {product.map((p) =>
                                            <li style={{ textAlign: "left", marginLeft: "" }} className="w-1/2 sm:w-1/4">
                                                <div className="border-1 border-black py-2 px-2 flex justify-around rounded">
                                                    <p>{p}</p>
                                                    <div name={p} onClick={updateProducts}><Button name={p} variant="outline-danger" onClick={updateProducts} style={{ marginLeft: "" }}><BsTrashFill onClick={updateProducts} name={p} /></Button>
                                                </div></div><br />
                                            </li>
                                        )
                                        }
                                    </ul><br />
                                    <Button className="btn btn-success" onClick={getQuote}>get Quote</Button>
                                </div>
                                : []
                        }
                    </div>

                    {
                        quoteList.length > 0 ?
                            <ItemList items={quoteList} />
                            : ""
                    }
                </center>

            </div>
        </div>

    )
}
export default Buyer
