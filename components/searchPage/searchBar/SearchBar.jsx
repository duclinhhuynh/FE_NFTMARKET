import React, {  useEffect,  useRef , useState } from 'react'
import { BsSearch, BsArrowRight } from 'react-icons/bs'
import {DateRangePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";
import {Slider} from "@nextui-org/react";
//INTERNAL IMPORT
import Style from "./SearchBar.module.css"
const SearchBar = ({onHandleSearch, onClearSearch}) => {
  const [search , setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [calendercheck, setCalendercheck] = useState(false);

  const openCalender = () => {
    setCalendercheck(!calendercheck);
  }

  const handleChange = (newRange) => {
    setPriceRange(newRange);
  };
  useEffect (() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);
  useEffect(() => {
    if(search){
      onHandleSearch(search)
    }else {
      onClearSearch();
    }
  },[search])


  return (
    <div className={Style.searchBar}>
      <div className={Style.searchBar_box_box}>
        <div className={Style.searchBar_box}>
            <BsSearch className={Style.searchBar_box_icon}/>
            <input type="text" placeholder="Type you key"
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            />
        </div>
        <div className="flex gap-x-4 realative" onClick={() => openCalender()}>
            <DateRangePicker 
          label="Stay duration" 
          isRequired
          defaultValue={{
            start: parseDate("2024-04-01"),
            end: parseDate("2024-04-08"),
          }}
          className="max-w-xs"
        />
        </div>
        <Slider 
        label="Price Range"
        step={10} 
        minValue={0} 
        maxValue={1000} 
        defaultValue={[100, 500]} 
        formatOptions={{style: "currency", currency: "USD"}}
        className="max-w-md"
      />
      </div>
    </div>
  )
}

export default SearchBar