import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Posts, { getStaticProps } from "@pages/posts";
import { getPrismicClient } from "@services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post Excerpt",
    updatedAt: "19 de junho de 2022",
  },
];

jest.mock("../src/services/prismic");

describe("Posts Page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loading initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByType: jest.fn().mockReturnValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My New Post" }],
              content: [{ type: "paragraph", text: "Post Excerpt" }],
            },
            last_publication_date: "2022-06-19:00:00:00",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              excerpt: "Post Excerpt",
              updatedAt: "19 de junho de 2022",
            },
          ],
        },
      })
    );
  });
});
