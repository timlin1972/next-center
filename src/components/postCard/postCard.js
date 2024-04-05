import styles from "./postCard.module.css";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <Link className={styles.link} href={`/blog/${post._id}`}>
          <h1 className={styles.title}>{post.title}</h1>
        </Link>
        <p className={styles.desc}>{post.desc}</p>
      </div>
    </div>
  );
};

export default PostCard;
