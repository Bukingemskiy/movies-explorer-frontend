import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox(props) {
  const [isFilterIcon, setFilterIcon] = React.useState("search__filter-icon");
  const [isIconRing, setIconRing] = React.useState("search__icon-ring");

  function handleFilterCheckboxChange() {
    if (
      isFilterIcon === "search__filter-icon" &&
      isIconRing === "search__icon-ring"
    ) {
      setFilterIcon("search__filter-icon search__filter-icon_on");
      setIconRing("search__icon-ring search__icon-ring_on");
      props.handleCheckbox(true);
    } else {
      setFilterIcon("search__filter-icon");
      setIconRing("search__icon-ring");
      props.handleCheckbox(false);
    }
    window.location.reload();
  }

  return (
    <div className="search__filter">
      <div className={isFilterIcon} onClick={handleFilterCheckboxChange}>
        <div className={isIconRing}></div>
      </div>
      <p className="search__filter-text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
