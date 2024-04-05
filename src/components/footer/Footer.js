import styles from "./footer.module.css"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Center</div>
      <div className={styles.text}>
        Center &copy; All rights reserved.
      </div>
    </div>
  )
}

export default Footer