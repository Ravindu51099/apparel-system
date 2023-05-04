import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  it("should render correctly", () => {
    const { getByText, getByLabelText } = render(<Login />);

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Username :")).toBeInTheDocument();
    expect(getByLabelText("Password :")).toBeInTheDocument();
  });

  it("should update email and password fields when user types", () => {
    const { getByLabelText } = render(<Login />);

    const emailInput = getByLabelText("Username :");
    const passwordInput = getByLabelText("Password :");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@test.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should submit form and redirect user on successful login", async () => {
    const { getByLabelText, getByText } = render(<Login />);

    const emailInput = getByLabelText("Username :");
    const passwordInput = getByLabelText("Password :");
    const submitButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toEqual("test-token");
      expect(localStorage.getItem("role")).toEqual("admin");
    });
  });
});
