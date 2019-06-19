import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/react/cleanup-after-each";

import Controls from "./Controls";

describe("<Controls />", () => {
  it("matches snapshot", () => {
    const control = renderer.create(<Controls />).toJSON();
    expect(control).toMatchSnapshot();
  });
});
