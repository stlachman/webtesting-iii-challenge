import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

import Display from "./Display";

describe("<Display />", () => {
  it("close gate click toggles open to closed", () => {
    const { getByText } = render(<Display />);
  });
});
