import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const {fieldsetName, checkboxValues, activeFilterValues, setFilter} = this.props;
    const fieldsetID = `${slugify(fieldsetName)}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{fieldsetName}</legend>
          <ul>
            {checkboxValues.map(value => {
              return (
                <FieldsetOption
                  fieldsetName={fieldsetName}
                  key={slugify(value)}
                  checkboxValue={value}
                  activeFilterValues={activeFilterValues}
                  setFilter={setFilter}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
