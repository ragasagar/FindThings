import React from "react"
import "./item-list.style.css"
import Item from "./item"

export const ItemList = (props) =>{
    /**
  *   Reusable component to display the items as card list
  */
    return <div className="item-list">
        {
        props.items.map(item => (
            <Item item={item} key={item.shopId}/>
        ))}
    </div>
}