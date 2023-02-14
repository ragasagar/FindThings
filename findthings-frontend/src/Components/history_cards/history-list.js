import React from "react"
import "./history-list.style.css"
import { History } from "./history"

export const HistoryList = (props) => {
    return <div className="history-list">
        {

            /**
              *   Reusable component to display the items as card list
              */
            props.orders.map(order => (
                <History order={order} key={order.orderId} type={props.type} acceptOrder={props.acceptOrder}
                    rejectOrder={props.rejectOrder} status={props.status} shops={props.shops} />
            ))}
    </div>
}