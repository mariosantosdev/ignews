import { render, screen } from "@testing-library/react";

import Home from "@pages/index";

jest.mock("next/router");
jest.mock("next-auth/react", () => ({
  useSession: () => [null, false],
}));

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
});
