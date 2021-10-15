import "./FilterCheckBox.css";

function FilterCheckBox(props) {
  function handleFilterCheckboxChange(e) {
    props.handleCheckbox(e.target.checked);
  }

  return (
    <div className="search__filter">
      <label
        for="icon-ring"
        className="search__filter-icon"
        onClick={handleFilterCheckboxChange}
      >
        <input
          type="checkbox"
          id="icon-ring"
          className="search__icon-ring"
        ></input>
      </label>
      <p className="search__filter-text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckBox;
