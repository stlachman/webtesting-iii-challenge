import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";
import renderer from "react-test-renderer";
import "@testing-library/react/cleanup-after-each";

import Dashboard from "../dashboard/Dashboard";
import Controls from "./Controls";

describe("<Controls />", () => {
  it("matches snapshot", () => {
    const control = renderer.create(<Controls />).toJSON();
    expect(control).toMatchSnapshot();
  });

  it("should have a close gate and lock gate button", () => {
    const { getByText } = render(<Controls />);
    getByText(/close gate/i);
    getByText(/lock gate/i);
  });

  it("should toggle text of close to open", () => {
    const { getByText } = render(<Dashboard />);
    const button = getByText(/close gate/i);
    fireEvent.click(button);
    getByText(/open gate/i);
  });

  // open gate to close gate
  it("should toggle text of open gate to close gate", () => {
    const { getByText } = render(<Dashboard />);
    const closeSwitch = getByText(/close gate/i);
    fireEvent.click(closeSwitch);

    const openSwitch = getByText(/open gate/i);
    fireEvent.click(openSwitch);
    getByText(/close gate/i);
  });

  it("should have disabled property on lock gate when gate is unlocked", () => {
    const { getByText } = render(<Dashboard />);
    const button = getByText(/lock gate/i);
    expect(button).toBeDisabled();
  });

  it("should have disabled property on open gate when gate is locked", () => {
    const { getByText } = render(<Dashboard />);
    let openControl = getByText(/close gate/i);
    fireEvent.click(openControl);
    fireEvent.click(getByText(/lock gate/i));

    expect(openControl).toBeDisabled();
  });
});
