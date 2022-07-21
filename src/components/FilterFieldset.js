import { forwardRef } from "react";

import FieldsetOption from "./FieldsetOption";

import { slugify } from '../utils/helpers';

const FilterFieldset = forwardRef(({ fieldsetName, checkboxValues }, ref) => {
  const fieldsetID = `${slugify(fieldsetName)}-fieldset`;

  return (
    <fieldset id={fieldsetID} ref={ref}>
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
})

export default FilterFieldset;
