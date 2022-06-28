import { fireEvent, render, screen } from "@testing-library/react";
import { useSession, signOut, signIn } from "next-auth/react";
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

  it("Should signIn GitHub when user clicks on the login button", () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    const signOutMock = mocked(signIn);

    render(<SignInButton />);

    fireEvent(
      screen.getByText("Entrar com GitHub"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(signOutMock).toHaveBeenCalledWith("github");
  });

  it("Should signOut when user clicks on the logout button", () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValueOnce({
      data: { user: { name: "John Doe" }, expires: String(Date.now()) },
      status: "authenticated",
    });

    const signOutMock = mocked(signOut);

    render(<SignInButton />);

    fireEvent(
      screen.getByText("John Doe"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(signOutMock).toHaveBeenCalled();
  });
});
