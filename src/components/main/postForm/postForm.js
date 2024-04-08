"use client";

// import { remark } from "remark";
// import html from "remark-html";
import { updatePost } from "@/lib/action";
import styles from "./postForm.module.css";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// const covertMarkdownIntoHtml = async (content) => {
//   const processedContent = await remark().use(html).process(content);
//   const contentHtml = processedContent.toString();

//   return contentHtml;
// };

const PostForm = ({ post }) => {
  //   const bodyHtml = await covertMarkdownIntoHtml(post.body);

  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  const [body, setBody] = useState(post.body);
  const [archive, setArchive] = useState(post.archive);

  const [state, formAction] = useFormState(updatePost, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/main/blog");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="id" value={post._id} />
      <label className={styles.archive}>
        <input
          type="checkbox"
          name="archive"
          value={archive}
          checked={archive}
          onChange={() => {
            setArchive(!archive);
          }}
        />
        <div className={styles.archiveTitle}>Archive</div>
      </label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        type="text"
        name="desc"
        placeholder="desc"
        value={desc}
        rows={5}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      />
      <textarea
        type="text"
        name="body"
        placeholder="body"
        value={body}
        rows={10}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      {/* <h1 className={styles.title}>Content</h1> */}
      {/* <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      /> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
