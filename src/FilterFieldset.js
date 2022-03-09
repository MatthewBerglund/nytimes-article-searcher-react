import React from "react";
import FieldsetOption from "./FieldsetOption";
import { slugify, camelCaseify } from './helpers';

class FilterFieldset extends React.Component {
  render() {
    const {details, state, setInputState} = this.props;
    const fieldsetID = `${slugify(details.filterType)}-fieldset`;

    return (
      <fieldset id={fieldsetID}>
          <legend>{details.filterType}</legend>
          <ul>
            {details.labels.map(label => {
              return (
                <FieldsetOption
                  key={slugify(label)}
                  label={label}
                  filterType={details.filterType}
                  state={state[camelCaseify(label)]}
                  setInputState={setInputState}
                />
              );
            })}
          </ul>
      </fieldset>
    );
  }
}

export default FilterFieldset;
