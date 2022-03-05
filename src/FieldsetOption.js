import React from "react";
import { slugify } from './helpers';

class FieldsetOption extends React.Component {
  render() {
    const {filterType, label} = this.props;
    const inputID = `${filterType}-${slugify(label)}`;

    return (
      <li className="fieldset-option-container">
        <input type="checkbox" id={inputID} value={label} />
        <label htmlFor={inputID}>
          {label}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
