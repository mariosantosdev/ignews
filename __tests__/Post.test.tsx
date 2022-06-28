import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Post, { getServerSideProps } from "@pages/posts/[slug]";
import { getPrismicClient } from "@services/prismic";
import { getSession } from "next-auth/react";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post Excerpt</p>",
  updatedAt: "19 de junho de 2022",
};

jest.mock("next-auth/react");
jest.mock("../src/services/prismic");

describe("Post Page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post Excerpt")).toBeInTheDocument();
  });

  it("redirect user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: expect.stringContaining("/posts/preview"),
        }),
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: true,
    } as any);

    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce({
        data: {
          title: [{ type: "heading", text: "My New Post" }],
          content: [{ type: "paragraph", text: "Post Excerpt" }],
        },
        last_publication_date: "2022-06-19:00:00:00",
      }),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: expect.objectContaining({
            title: "My New Post",
            content: "<p>Post Excerpt</p>",
            updatedAt: "19 de junho de 2022",
          }),
        },
      })
    );
  });

  it("renders 404 if post is not found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: true,
    } as any);

    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockReturnValueOnce(null),
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        notFound: true,
      })
    );
  });
});
