import React, { useEffect, useRef, useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { Slider, Input } from "@nextui-org/react";
//INTERNAL IMPORT
import Style from "./SearchBar.module.css";
const SearchBar = ({ onHandleSearch, onClearSearch, onHandleSearchPrice }) => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [calendercheck, setCalendercheck] = useState(false);
  // const [value, setValue] = useState([10, 50]);
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [dateRange, setDateRange] = useState({
    start: parseDate("2024-04-01"),
    end: parseDate("2024-04-08"),
  });
  const openCalender = () => {
    setCalendercheck(!calendercheck);
  };
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 500);
    return () => clearTimeout(timer);
  }, [searchItem]);
  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  useEffect(() => {
    onHandleSearchPrice(priceRange);
  }, [priceRange]);
  return (
    <div className={Style.searchBar}>
      <div className="w-[90%] flex m-auto xl:flex-row max:md:flex-col sm:flex-col max-sm:flex-col rounded-xl gap-2 justify-around mt-[3rem] py-5 border p-5">
        <div className="">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "min-w-[250px]",
              ],
            }}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Type to search..."
            startContent={
              <BsSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
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
            className="max-w-xs min-w-[250px]"
          />
        </div>
        <div>
          <Slider
            label="Price Range"
            step={0.01}
            minValue={0}
            maxValue={100}
            value={priceRange}
            onChange={setPriceRange}
            defaultValue={[0.01, 10]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md min-w-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
