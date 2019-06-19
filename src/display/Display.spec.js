import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

import Dashboard from "../dashboard/Dashboard";
import Display from "./Display";

describe("<Display />", () => {
  it("should display gate open and unlocked initially", () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i);
    getByText(/open/i);
  });

  it("should display gate unlocked and closed after clicking close gate", () => {
    const { getByText } = render(<Dashboard />);
    let button = getByText(/close gate/i);
    fireEvent.click(button);
    getByText(/unlocked/i);
    getByText(/closed/i);
  });

  it("should display gate locked and closed after clicking close gate and lock gate", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    fireEvent.click(closeButton);
    const lockGate = getByText(/lock gate/i);
    fireEvent.click(lockGate);

    getByText(/locked/i);
    getByText(/closed/i);
  });

  it("should display gate unlocked and closed after clicking close gate,lock gate, unlock gate", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    fireEvent.click(closeButton);
    let lockGate = getByText(/lock gate/i);
    fireEvent.click(lockGate);
    fireEvent.click(getByText(/unlock gate/i));

    getByText(/unlocked/i);
    getByText(/closed/i);
  });
});
