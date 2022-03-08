import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const {filterType, legend, labels} = this.props.options;
    const fieldsetID = `${filterType}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{legend}</legend>
          <ul>
            {labels.map(label => {
              return (
                <FieldsetOption
                  key={slugify(label)}
                  label={label}
                  filterType={filterType}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
