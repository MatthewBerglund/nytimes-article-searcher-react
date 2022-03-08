import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify, camelCaseify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const {filterType, labels} = this.props.details;
    const state = this.props.state;
    const fieldsetID = `${filterType}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{filterType}</legend>
          <ul>
            {labels.map(label => {
              return (
                <FieldsetOption
                  key={slugify(label)}
                  label={label}
                  filterType={filterType}
                  state={state[camelCaseify(label)]}
                  setInputState={this.props.setInputState}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
