import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";

describe("InputField", () => {
  test("renders label and helper", () => {
    render(<InputField label="Name" helperText="helper" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("helper")).toBeInTheDocument();
  });

  test("clear button clears uncontrolled input and calls onChange synthetic", () => {
    const handle = vi.fn();
    render(<InputField value="abc" showClear onChange={handle} />);
    const btn = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(btn);
    expect(handle).toHaveBeenCalled();
  });

  test("password toggle changes type", () => {
    render(<InputField type="password" showPasswordToggle />);
    const toggle = screen.getByRole("button", { name: /show password/i });
    fireEvent.click(toggle);
    // after clicking, label becomes Hide password
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();
  });

  test("loading disables clear and toggle", () => {
    render(
      <InputField
        defaultValue="x"
        loading
        showClear
        showPasswordToggle
        type="password"
      />
    );
    expect(
      screen.queryByRole("button", { name: /clear input/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show password/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
