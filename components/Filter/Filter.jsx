import React, { useState } from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
// INTERNAL IMPORT
import Style from "./Filter.module.css";
const Filter = ({ onHandleSelect }) => {
  const [groupSelected, setGroupSelected] = useState(["All"]);

// Handle checkbox selection
  const handleCheckboxChange = (selectedValues) => {
    if (selectedValues.includes("All")) {
      // If "All" checkbox is selected, deselect "All" and select the rest
      setGroupSelected(selectedValues.filter((value) => value !== "All"));
      onHandleSelect(selectedValues.filter((value) => value !== "All"));
    } else {
      // If other checkboxes are selected, deselect "All" and select the rest
      setGroupSelected(selectedValues);
      onHandleSelect(selectedValues);
    }
  };

  // Handle click on "All" checkbox
  const handleAllCheckbox = (checked) => {
    if (checked) {
      // If "All" checkbox is checked, select all categories
      const allValues = ["All"];
      setGroupSelected(allValues);
      onHandleSelect(allValues);
    } else {
      // If "All" checkbox is unchecked, deselect all categories
      setGroupSelected([]);
      onHandleSelect([]);
    }
  };
  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={`flex flex-wrap flex-col gap-2`}>
          <CheckboxGroup
            label="Select NFT"
            orientation="horizontal"
            defaultValue={[
              "All",
              "Image",
              "Photography",
              "Arts",
              "Musics",
              "Sport",
            ]}
            color="secondary"
            value={groupSelected}
            onChange={handleCheckboxChange}
          >
            <div className="flex flex-wrap gap-5">
              <Checkbox
                className="text-white"
                value="All"
                onChange={(e) => handleAllCheckbox(e.target.checked)}
              >
                All
              </Checkbox>
              <Checkbox className="text-white" value="Image">
                Image
              </Checkbox>
              <Checkbox className="text-white" value="Photography">
                Photography
              </Checkbox>
              <Checkbox className="text-white" value="Arts">
                Arts
              </Checkbox>
              <Checkbox className="text-white" value="Musics">
                Musics
              </Checkbox>
              <Checkbox className="text-white" value="Sport">
                Sport
              </Checkbox>
            </div>
          </CheckboxGroup>
          <p className="mt-4 ml-1 text-default-500">
            Selected: {groupSelected.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
