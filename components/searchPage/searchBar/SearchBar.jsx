import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { Slider, Input, Select, SelectItem } from "@nextui-org/react";

import Style from "./SearchBar.module.css";

const SearchBar = ({
  onHandleSearch,
  onClearSearch,
  onHandleSearchPrice,
  onHandleSort,
}) => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [priceRange, setPriceRange] = useState([10, 50]);

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
      <div className="flex flex-col flex-wrap rounded-xl gap-5 justify-around mt-[3rem] py-5 border p-5">
        <div className="">
          <Input
            label="Search"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [],
              innerWrapper: "bg-transparent",
            }}
            onChange={(e) => setSearchItem(e.target.value)}
            onClear={onClearSearch}
            placeholder="Type to search..."
            startContent={
              <BsSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div>
          <Select
            label="Sort Price"
            placeholder="Select sort"
            initialSelectedKeys={['Lowest Price']}
            defaultSelectedKeys={["Lowest Price"]}
            className="max-w-xs"

            onSelectionChange={(keys) => onHandleSort(keys.currentKey)}
          >
            <SelectItem key="Lowest Price">Lowest Price</SelectItem>
            <SelectItem key="Highest Price">Highest Price</SelectItem>
            <SelectItem key="Lowest ID">Lowest ID</SelectItem>
            <SelectItem key="Highest ID">Highest ID</SelectItem>
            <SelectItem key="Last">Last</SelectItem>
          </Select>
        </div>
        <div className="flex gap-x-4 relative">
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
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
