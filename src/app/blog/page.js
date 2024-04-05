import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog",
  description: "Blog",
};

const getData = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/blog`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const Blog = async () => {
  const posts = await getData();

  return (
    <div>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
