import styles from "./main.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Center</h1>
        <p className={styles.desc}>Next Generation</p>
      </div>
    </div>
  );
};

export default Home;
