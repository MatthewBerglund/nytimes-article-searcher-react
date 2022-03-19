import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const fieldsetID = `${slugify(this.props.fieldsetName)}-fieldset`;

    return (
      <fieldset id={fieldsetID} ref={this.props.reference}>
          <legend>{this.props.fieldsetName}</legend>
          <ul>
            {this.props.checkboxValues.map(value => {
              return (
                <FieldsetOption
                  fieldsetName={this.props.fieldsetName}
                  filter={this.props.filter}
                  key={slugify(value)}
                  checkboxValue={value}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
