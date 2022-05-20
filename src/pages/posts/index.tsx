import { Fragment } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";

import styles from "@styles/posts.module.scss";
import { getPrismicClient } from "@services/prismic";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <Fragment>
      <Head>
        <title>Ig.news - Postagens</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.getByType("posts", {
    fetch: ["posts.title", "posts.content"],
    pageSize: 100,
  });

  const posts = response.results.map((rawPost) => ({
    slug: rawPost.uid,
    title: RichText.asText(rawPost.data.title),
    excerpt:
      rawPost.data.content.find(
        (content) => content.type === "paragraph" && content.text !== ""
      )?.text ?? "",
    updatedAt: new Date(rawPost.last_publication_date).toLocaleDateString(
      "pt-br",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));

  return {
    props: {
      posts,
    },
  };
};
