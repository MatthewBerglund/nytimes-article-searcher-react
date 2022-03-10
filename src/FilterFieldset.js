import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const filterField = this.props.filterField;
    const filterValues = this.props.filterValues;
    const fieldsetID = `${slugify(filterField)}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{filterField}</legend>
          <ul>
            {filterValues.map(value => {
              return (
                <FieldsetOption
                  key={slugify(value)}
                  filterValue={value}
                  filterField={filterField}
                  search={this.props.search}
                  setSearch={this.props.setSearch}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
