import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import PostPreview, { getStaticProps } from "@pages/posts/preview/[slug]";
import { getPrismicClient } from "@services/prismic";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post Excerpt</p>",
  updatedAt: "19 de junho de 2022",
};

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../src/services/prismic");

describe("Home Page", () => {
  it("renders correctly", () => {
    const useSessionsMocked = mocked(useSession);

    useSessionsMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post Excerpt")).toBeInTheDocument();
    expect(screen.getByText("Quer continuar lendo?")).toBeInTheDocument();
  });

  it("redirect user if has subscription active", async () => {
    const useSessionsMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useSessionsMocked.mockReturnValueOnce({
      data: {
        activeSubscription: true,
        expires: "2022-06-19T00:00:00.000Z",
      },
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-post");
  });

  it("loading initial data", async () => {
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

    const response = await getStaticProps({
      params: {
        slug: "my-new-post",
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: expect.objectContaining({
            slug: "my-new-post",
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

    const response = await getStaticProps({
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
