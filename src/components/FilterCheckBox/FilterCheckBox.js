import "./FilterCheckBox.css";

function FilterCheckBox(props) {
  function handleFilterCheckboxChange(e) {
    props.handleCheckbox(e.target.checked);
  }

  return (
    <div className="search__filter">
      <input
        className="search__filter-icon"
        type="checkbox"
        onChange={handleFilterCheckboxChange}
      >
        <div className="search__icon-ring"></div>
      </input>
      <p className="search__filter-text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
