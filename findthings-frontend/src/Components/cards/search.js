import React from "react";
import "./search.style.css";

export const SearchBox = ({placeholder, handleChange}) =>(
    <input
        type = "search"
        placeholder = {placeholder}
        className ="search focus:bg-green-50 focus:border-green-600 rounded-lg"
        onChange={handleChange}
    />
)