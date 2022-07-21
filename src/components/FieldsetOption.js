import { slugify } from '../utils/helpers';

// Renders a checkbox that enables/disables a corresponding search filter
const FieldsetOption = ({ fieldsetName, checkboxValue }) => {
  const checkboxID = `${slugify(fieldsetName)}-${slugify(checkboxValue)}`;

  return (
    <li className="fieldset-option-container">
      <input type="checkbox" id={checkboxID} value={checkboxValue} />
      <label htmlFor={checkboxID}>
        {checkboxValue}
      </label>
    </li>
  );
}

export default FieldsetOption;
