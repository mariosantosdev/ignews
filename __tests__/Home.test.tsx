import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Home, { getStaticProps } from "@pages/index";
import { stripe } from "@services/stripe";

jest.mock("next/router");
jest.mock("next-auth/react", () => ({
  useSession: () => [null, false],
}));
jest.mock("../src/services/stripe");

describe("Home Page", () => {
  it("renders correctly", () => {
    render(
      <Home
        product={{
          priceId: "1",
          amount: "R$10,00",
        }}
      />
    );

    expect(screen.getByText("por apenas R$10,00 mensais.")).toBeInTheDocument();
  });

  it("loading initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "1",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            amount: expect.stringContaining("10,00"),
            priceId: "1",
          },
        },
      })
    );
  });
});
