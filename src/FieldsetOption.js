import React from "react";
import { slugify, camelCaseify } from './helpers';

class FieldsetOption extends React.Component {
  handleCheckboxChange = e => {
    const checkbox = e.target;
    const filterValue = checkbox.value;
    const filterField = camelCaseify(this.props.filterField);
    const isFilterActive = checkbox.checked;
    this.toggleFilter(filterField, filterValue, isFilterActive);
  }

  toggleFilter = (filterField, filterValue, isFilterActive) => {
    const searchState = {...this.props.search};
    if (isFilterActive) {
      searchState[filterField].push(filterValue);
    } else {
      const indexToRemove = searchState[filterField].indexOf(filterValue);
      searchState[filterField].splice(indexToRemove, 1);
    }
    this.props.setSearch(searchState);
  }

  render() {
    const {filterField, filterValue, search} = this.props;
    const inputID = `${slugify(filterField)}-${slugify(filterValue)}`;
    const isFilterActive = search[camelCaseify(filterField)].includes(filterValue);

    return (
      <li className="fieldset-option-container">
        <input 
          type="checkbox"  
          id={inputID} 
          value={filterValue}
          checked={isFilterActive}
          onChange={this.handleCheckboxChange}
        />
        <label htmlFor={inputID}>
          {filterValue}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
