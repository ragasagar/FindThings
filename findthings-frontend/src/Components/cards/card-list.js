import React from "react"
import "./card-list.style.css"
import { Card } from "./card"

export const CardList = (props) =>{

    return <div className="card-list">
        {
            /**
              *   Reusable component to display the items as card list
              */
        props.items.map(item => (
            <Card item={item}/>
        ))}
    </div>
}