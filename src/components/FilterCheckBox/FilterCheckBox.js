import "./FilterCheckBox.css";

function FilterCheckBox(props) {
  function handleFilterCheckboxChange(e) {
    props.handleCheckbox(e.target.checked);
  }

  return (
    <div className="search__filter">
      <div className="search__filter-icon" onClick={handleFilterCheckboxChange}>
        <div className="search__icon-ring"></div>
      </div>
      <p className="search__filter-text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
