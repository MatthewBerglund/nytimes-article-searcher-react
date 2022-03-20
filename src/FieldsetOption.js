import React from "react";
import { slugify } from './helpers';

// Renders a checkbox that enables/disables a corresponding search filter
class FieldsetOption extends React.Component {
  render() {
    const { fieldsetName, checkboxValue } = this.props;
    const checkboxID = `${slugify(fieldsetName)}-${slugify(checkboxValue)}`;

    return (
      <li className="fieldset-option-container">
        <input 
          type="checkbox"
          id={checkboxID} 
          value={checkboxValue}
        />
        <label htmlFor={checkboxID}>
          {checkboxValue}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
