import React from "react";
import { slugify, camelCaseify } from './helpers';

class FieldsetOption extends React.Component {
  handleChange = event => {
    this.props.setInputState(event);
  }

  render() {
    const {filterType, label, state} = this.props;
    const inputID = `${slugify(filterType)}-${slugify(label)}`;

    return (
      <li className="fieldset-option-container">
        <input 
          type="checkbox" 
          name={camelCaseify(label)} 
          id={inputID} 
          value={label}
          checked={state.isChecked}
          onChange={this.handleChange}
          data-fieldset={camelCaseify(filterType)}
        />
        <label htmlFor={inputID}>
          {label}
        </label>
      </li>
    );
  }
}

export default FieldsetOption;
