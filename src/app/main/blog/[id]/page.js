import styles from "./post.module.css";
import { Suspense } from "react";
import { getUser, getPost } from "@/lib/data";
import PostForm from "@/components/main/postForm/postForm";

// const getData = async (id) => {
//   const res = await fetch(
//     `http://localhost:${process.env.PORT}/api/blog/${id}`
//   );

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const post = await getPost(id);

  return {
    title: post.title,
    description: post.desc,
  };
};

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);

  return (
    <div className={styles.texts}>
      <h1 className={styles.author}>Author</h1>
      <p className={styles.username}>{user.username}</p>
    </div>
  );
};

const Post = async ({ params }) => {
  const { id } = params;

  // const post = await getData(id);
  const post = await getPost(id);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
        </div>
        <PostForm post={post} />
      </div>
    </div>
  );
};

export default Post;
