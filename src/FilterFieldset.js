import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const {fieldsetName, reference, checkboxValues} = this.props;
    const fieldsetID = `${slugify(fieldsetName)}-fieldset`;

    return (
      <fieldset id={fieldsetID} ref={reference}>
          <legend>{fieldsetName}</legend>
          <ul>
            {checkboxValues.map(value => {
              return (
                <FieldsetOption
                  fieldsetName={fieldsetName}
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
