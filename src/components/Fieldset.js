import { forwardRef } from "react";

import FieldsetOption from "./FieldsetOption";

import { slugify } from '../utils/helpers';

const FilterFieldset = forwardRef(({ name, values }, ref) => {
  // const fieldsetID = `${slugify(fieldsetName)}-fieldset`;

  return (
    <fieldset ref={ref}>
      <legend>{name}</legend>
      <ul>
        {values.map(value => {
          return (
            <FieldsetOption
              fieldset={name}
              key={slugify(value)}
              value={value}
            />
          );
        })}
      </ul>
    </fieldset>
  );
})

export default FilterFieldset;
