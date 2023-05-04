import React from "react";
import { mount } from "enzyme";
import { Form, Input, Button, Select } from "antd";
import FrontOfficeForm from "./FrontOfficeForm";

describe("FrontOfficeForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FrontOfficeForm />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render the form with all fields and buttons", () => {
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(4);
    expect(wrapper.find(Select)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it("should update the generatedTime state when the Generate Time button is clicked", () => {
    const generateTimeButton = wrapper.find(Button).at(0);
    generateTimeButton.simulate("click");
    expect(wrapper.state("generatedTime")).not.toBe("");
  });

  it("should call the handleSubmit function when the Submit button is clicked", () => {
    const handleSubmitMock = jest.fn();
    wrapper.instance().handleSubmit = handleSubmitMock;
    const submitButton = wrapper.find(Button).at(1);
    submitButton.simulate("click");
    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("should redirect to the login page when the Logout button is clicked", () => {
    global.window = Object.create(window);
    const url = "/login";
    Object.defineProperty(window, "location", {
      value: {
        href: "",
        assign: jest.fn(),
      },
      writable: true,
    });
    const logoutButton = wrapper.find(Button).at(2);
    logoutButton.simulate("click");
    expect(window.location.assign).toHaveBeenCalledWith(url);
  });
});
