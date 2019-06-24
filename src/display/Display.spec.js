import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";

import Dashboard from "../dashboard/Dashboard";
import Display from "./Display";

describe("create a snapshot of display component", () => {
  it("matches snapshot", () => {
    const control = renderer.create(<Display />).toJSON();
    expect(control).toMatchSnapshot();
  });
});

describe("<Display />", () => {
  it("should display gate open and unlocked initially", () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i);
    getByText(/open/i);
  });
});

// Display status messages based on clicks
describe("display status messages", () => {
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

// Display text changes based on props
describe("display text changes based on closed and locked props", () => {
  it("should display closed if closed prop is true", () => {
    const { getByText } = render(<Display closed={true} locked={false} />);
    getByText(/closed/i);
  });

  it("should display open if closed prop is false", () => {
    const { getByText } = render(<Display closed={false} locked={false} />);
    getByText(/open/i);
  });

  it("should display locked if locked prop is true", () => {
    const { getByText } = render(<Display closed={true} locked={true} />);
    getByText(/locked/i);
  });

  it("should display unlocked if locked prop is false", () => {
    const { getByText } = render(<Display closed={true} locked={false} />);
    getByText(/unlocked/i);
  });
});

describe("class names based on closed and locked props", () => {
  it("should have red-led class if closed prop is true", () => {
    const { getByText } = render(<Display closed={true} locked={false} />);
    const closed = getByText(/closed/i);
    expect(closed).toHaveClass("red-led");
  });

  it("should have red-led class if locked prop is true", () => {
    const { getByText } = render(<Display closed={true} locked={true} />);
    const locked = getByText(/locked/i);
    expect(locked).toHaveClass("red-led");
  });

  it("should have green-led class if closed prop is false", () => {
    const { getByText } = render(<Display closed={false} locked={false} />);
    const open = getByText(/open/i);
    expect(open).toHaveClass("green-led");
  });

  it("should have green-led class if locked prop is false", () => {
    const { getByText } = render(<Display closed={true} locked={false} />);
    const unlocked = getByText(/unlocked/i);
    expect(unlocked).toHaveClass("green-led");
  });
});
