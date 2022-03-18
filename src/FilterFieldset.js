import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const fieldsetID = `${slugify(this.props.fieldsetName)}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{this.props.fieldsetName}</legend>
          <ul>
            {this.props.checkboxValues.map(value => {
              return (
                <FieldsetOption
                  fieldsetName={this.props.fieldsetName}
                  filter={this.props.filter}
                  key={slugify(value)}
                  checkboxValue={value}
                  urlSearchParams={this.props.urlSearchParams}
                  setUrlSearchParams={this.props.setUrlSearchParams}
                // activeFilterValues={activeFilterValues}
                // setFilter={setFilter}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
