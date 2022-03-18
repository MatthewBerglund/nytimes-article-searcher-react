import React from "react";
import { slugify } from './helpers';

// Renders a checkbox that enables/disables a corresponding search filter
class FieldsetOption extends React.Component {
  // Add checkbox value to active filters in search params
  enableFilterValue = checkboxValue => {
    const {filter, urlSearchParams, setUrlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]);
    const activeFilterValues = searchParams[filter] ? searchParams[filter].split(',') : [];
    activeFilterValues.push(checkboxValue);
    searchParams[filter] = activeFilterValues.join(',');
    setUrlSearchParams(searchParams);
  }
  
  // Remove checkbox value from active filter values
  // If no active values, remove filter from search params
  disableFilterValue = checkboxValue => {
    const {filter, urlSearchParams, setUrlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]);
    const activeFilterValues = searchParams[filter] ? searchParams[filter].split(',') : [];
    const indexToRemove = activeFilterValues.indexOf(checkboxValue);
    activeFilterValues.splice(indexToRemove, 1);

    if (activeFilterValues.length === 0) {
      delete searchParams[filter];
    } else {
      searchParams[filter] = activeFilterValues.join(',');
    }

    setUrlSearchParams(searchParams);
  }

  render() {
    const {filter, fieldsetName, checkboxValue, urlSearchParams} = this.props;
    const searchParams = Object.fromEntries([...urlSearchParams]); 
    const checkboxID = `${slugify(fieldsetName)}-${slugify(checkboxValue)}`;
    const activeFilterValues = searchParams[filter] ? searchParams[filter].split(',') : [];
    const isChecked = activeFilterValues.includes(checkboxValue);

    return (
      <li className="fieldset-option-container">
        <input 
          type="checkbox"
          id={checkboxID} 
          value={checkboxValue}
          checked={isChecked}
          onChange={e => e.target.checked ? this.enableFilterValue(e.target.value) : this.disableFilterValue(e.target.value)}
        />
        <label htmlFor={checkboxID}>
          {checkboxValue}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
