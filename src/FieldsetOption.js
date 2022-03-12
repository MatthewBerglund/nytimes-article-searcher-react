import React from "react";
import { slugify } from './helpers';

// Renders a checkbox that enables/disables a corresponding search filter
class FieldsetOption extends React.Component {
  // Add checkbox value to active filters in state
  enableFilter = checkboxValue => {
    const activeFilterValues = this.props.activeFilterValues.slice(0);
    activeFilterValues.push(checkboxValue);
    this.props.setFilter(activeFilterValues);
  }
  
  // Remove checkbox value from active filters in state
  disableFilter = checkboxValue => {
    const activeFilterValues = this.props.activeFilterValues.slice(0);
    const indexToRemove = activeFilterValues.indexOf(checkboxValue);
    activeFilterValues.splice(indexToRemove, 1);
    this.props.setFilter(activeFilterValues);
  }

  render() {
    const {fieldsetName, checkboxValue, activeFilterValues} = this.props;
    const checkboxID = `${slugify(fieldsetName)}-${slugify(checkboxValue)}`;
    const isChecked = activeFilterValues.includes(checkboxValue);

    return (
      <li className="fieldset-option-container">
        <input 
          type="checkbox"
          id={checkboxID} 
          value={checkboxValue}
          checked={isChecked}
          onChange={e => e.target.checked ? this.enableFilter(e.target.value) : this.disableFilter(e.target.value)}
        />
        <label htmlFor={checkboxID}>
          {checkboxValue}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
