import React, { Component } from 'react';

export default class SearchBar extends Component {
    /**
     *   This Component will show the search bar at the buyer page with Search button
     */

    constructor(props) {
        super()
        this.state = {
            searchData: null,
            noData: false,
            query: "",
            items: [],
            product: ""
        };
    }

/**      render function:
     *   This function will render the search bar at the buyer page with Search button
     */
    render() {
        return (
            <div style={{ marginTop: "40px" }}>
                <input type="text" value={this.props.value} placeholder="Search Item by name" onChange={this.props.handleChange} style={{ marginRight: "10px" }}
                 className ="search-input focus:bg-green-30 focus:border-green-600 rounded-md" />
                <input type="submit" className="btn btn-success" value="Search" onClick={this.props.search}
                 className ="search-bar btn-success rounded-md"/>
            </div>
        )
    }
}

