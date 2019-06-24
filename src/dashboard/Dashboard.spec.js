import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/react/cleanup-after-each";

import Dashboard from "./Dashboard";

describe("<Dashboard />", () => {
  it("matches snapshot", () => {
    const dashboard = renderer.create(<Dashboard />).toJSON();
    expect(dashboard).toMatchSnapshot();
  });
});
