import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";

import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton Component", () => {
  it("Should render correctly when user is not authenticated", () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("Entrar com GitHub")).toBeInTheDocument();
  });

  it("Should render correctly when user is authenticated", () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: { user: { name: "John Doe" }, expires: String(Date.now()) },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
