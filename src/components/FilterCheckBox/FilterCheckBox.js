import React from "react";
import "./FilterCheckBox.css";
import { useLocation } from "react-router-dom";

function FilterCheckBox(props) {
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
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
    if (isFilterIcon === "search__filter-icon") {
      props.onSearchMovies(
        !isSavedMovies ? props.cacheSearch : props.search,
        true
      );
    } else {
      props.onSearchMovies(
        !isSavedMovies ? props.cacheSearch : props.search,
        false
      );
    }
  }

  React.useEffect(() => {
    if (isSavedMovies) {
      setFilterIcon("search__filter-icon");
      setIconRing("search__icon-ring");
      document.location.reload();
    } else {
      if (props.cacheCheckbox === true) {
        setFilterIcon("search__filter-icon search__filter-icon_on");
        setIconRing("search__icon-ring search__icon-ring_on");
      } else {
        setFilterIcon("search__filter-icon");
        setIconRing("search__icon-ring");
      }
    }
  }, [isSavedMovies, location.pathname, props.cacheCheckbox]);

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
