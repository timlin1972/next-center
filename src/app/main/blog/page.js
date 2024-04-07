import { getUser, getUserByEmail } from "@/lib/data";
import { deletePost } from "@/lib/action";
import styles from "./blog.module.css";
import Link from "next/link";
import { Suspense } from "react";
import Search from "@/components/main/search/search";
import Pagination from "@/components/main/pagination/pagination";
import { auth } from "@/lib/auth";
import { fetchPosts } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Blog",
};

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return <div>{user.username}</div>;
};

const PostTable = ({ data }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <td>Title</td>
        <td>Author</td>
        <td>Description</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {data.map((data) => {
        return (
          <tr key={data.title}>
            <td className={styles.title}>
              <Link className={styles.link} href={`/main/blog/${data._id}`}>
                {data.title}
              </Link>
            </td>
            <td>
              {data && (
                <Suspense fallback={<div>Loading...</div>}>
                  <PostUser userId={data.userId} />
                </Suspense>
              )}
            </td>
            <td>{data.desc}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/main/blog/${data._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={data._id} />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </form>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const Blog = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const { count, posts } = await fetchPosts(q, page);

  const session = await auth();
  const user = await getUserByEmail(session.user.email);

  return (
    <div className={styles.container}>
      {posts?.error ? (
        <div>{posts.error}</div>
      ) : (
        <div>
          <div className={styles.top}>
            <Search placeholder="Search for a blog..." />
            <Link
              href={{
                pathname: "/main/blog/add",
                query: { userId: user.id },
              }}
            >
              <button className={styles.addButton}>Add New</button>
            </Link>
          </div>
          <PostTable data={posts} />
          <Pagination count={count} />
        </div>
      )}
    </div>
  );
};

export default Blog;
