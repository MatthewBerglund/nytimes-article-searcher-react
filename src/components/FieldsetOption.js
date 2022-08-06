import { slugify } from '../utils/helpers';

import styles from '../styles/FieldsetOption.module.css';

// Renders a checkbox that enables/disables a corresponding search filter
const FieldsetOption = ({ fieldset, value }) => {
  const checkboxId = `${slugify(fieldset)}-${slugify(value)}`;

  return (
    <li className={styles.li}>
      <input type="checkbox" id={checkboxId} value={value} />
      <label htmlFor={checkboxId}>
        {value}
      </label>
    </li>
  );
}

export default FieldsetOption;
