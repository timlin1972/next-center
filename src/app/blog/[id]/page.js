import styles from "./post.module.css";
import { getPost } from "@/lib/data";
import { Suspense } from "react";
import PostUser from "@/components/postUser/postUser";
import { remark } from "remark";
import html from "remark-html";

const getData = async (id) => {
  const res = await fetch(
    `http://localhost:${process.env.PORT}/api/blog/${id}`
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const post = await getPost(id);

  return {
    title: post.title,
    description: post.desc,
  };
};

const covertMarkdownIntoHtml = async (content) => {
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
};

const Post = async ({ params }) => {
  const { id } = params;

  const post = await getData(id);
  const bodyHtml = await covertMarkdownIntoHtml(post.body);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>
    </div>
  );
};

export default Post;
