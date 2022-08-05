import { useContext } from "react";

import { KeywordClickContext } from "../App";

import styles from '../styles/Keyword.module.css';

const Keyword = ({ keyword }) => {
  const performKeywordSearch = useContext(KeywordClickContext);

  return (
    <li className={styles.keyword} tabIndex="0">
      <a onClick={() => performKeywordSearch(keyword.value)}>
        {keyword.value}
      </a>
    </li>
  );
}

export default Keyword;
