import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "../LoginForm";

describe("test login form", () => {
  it("should render the form fields", () => {
    render(
      <LoginForm
        onFormSubmit={(e) => {
          expect(e.username === "jake").toBeTruthy();
          expect(e.password === "password").toBeTruthy();
        }}
      />
    );

    fireEvent.change(screen.getByLabelText("username", { exact: false }), {
      target: { value: "jake" },
    });

    fireEvent.change(screen.getByLabelText("password", { exact: false }), {
      target: { value: "password" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Sign In", exact: false })
    );
  });
});
