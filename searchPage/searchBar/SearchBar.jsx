import React from 'react'
import { BsSearch, BsArrowRight } from 'react-icons/bs'

//INTERNAL IMPORT
import Style from "./SearchBar.module.css"
const SearchBar = () => {
  return (
    <div className={Style.searchBar}>
        <div className={Style.searchBar_box}>
            <BsSearch className={Style.searchBar_box_icon}/>
            <input type="text" placeholder="Type you key"/>
            <BsArrowRight className={Style.searchBar_box_icon}/>
        </div>
    </div>
  )
}

export default SearchBar