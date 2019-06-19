import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
});
