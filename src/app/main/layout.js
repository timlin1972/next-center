import Navbar from "@/components/main/navbar/navbar";
import Sidebar from "@/components/main/sidebar/sidebar";
import styles from "./main.module.css";
import Footer from "@/components/main/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
