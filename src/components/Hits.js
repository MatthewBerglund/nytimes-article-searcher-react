import styles from '../styles/Hits.module.css';

const Hits = ({ total }) => {
  return (
    <div className={styles.container}>
      <p>Your search returned {total} hits.</p>
    </div>
  );
};

export default Hits;
