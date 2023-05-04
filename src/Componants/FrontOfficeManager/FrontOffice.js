import React, { useState } from "react";
import { Form, Input, Button, Select, Row, Col, Space } from "antd";

const { Option } = Select;

const FrontOfficeForm = () => {
  const [form] = Form.useForm();
  const [generatedTime, setGeneratedTime] = useState("");
  const token = localStorage.getItem("token");

  const handleGenerateTime = () => {
    window.location.href = "http://127.0.0.1:5000/";
  };

  const handleLogout = () => {
    // Clear session storage
    localStorage.clear();

    // Redirect to login page
    window.location.href = "/login";
  };

  // const handleSubmit = (values) => {
  //   console.log("Form values:", values);
  //   form.resetFields();
  // };
  const handleSubmit = (values) => {
    const customerData = {
      name: values.name,
      address: values.address,
      email: values.email,
      contact: values.contactNumber,
    };

    const orderData = {
      material_type: values.materialType,
      quantity: values.quantity,
      print_available: values.printAvailable,
      required_size: values.requiredSizes,
    };

    console.log(JSON.stringify(customerData));

    fetch("http://localhost:8000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Customer created:", data);
        orderData['customer_id'] =data.id;
        console.log( orderData);
        fetch('http://localhost:8000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(orderData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Order created:', data);
            form.resetFields();
          })
          .catch((error) => {
            console.error('Error creating order:', error);
          });
      })
      .catch((error) => {
        console.error("Error creating customer:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #007991, #78FFD6)",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Front Office Form
      </h1>
      <Form
        style={{ padding: "20px", width: "550px", alignItems: "start" }}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input style={{ width: "500px" }} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input style={{ width: "500px" }} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input style={{ width: "500px" }} />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            { required: true, message: "Please enter your contact number" },
          ]}
        >
          <Input style={{ width: "500px" }} />
        </Form.Item>
        <Form.Item
          label="Material Type"
          name="materialType"
          rules={[{ required: true, message: "Please select a material type" }]}
        >
          <Select style={{ width: "500px" }}>
            <Option value="brochure">Brochure</Option>
            <Option value="poster">Poster</Option>
            <Option value="business-card">Business Card</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Print Available"
          name="printAvailable"
          rules={[
            { required: true, message: "Please select print availability" },
          ]}
        >
          <Select style={{ width: "500px" }}>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity" }]}
        >
          <Input style={{ width: "500px" }} type="number" min="1" />
        </Form.Item>
        <Form.Item
          label="Required Sizes"
          name="requiredSizes"
          rules={[{ required: true, message: "Please enter required sizes" }]}
        >
          <Input style={{ width: "500px" }} />
        </Form.Item>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={handleGenerateTime}>Generate Time</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      {generatedTime && (
        <p style={{ marginTop: "20px" }}>Generated Time: {generatedTime}</p>
      )}
    </div>
  );
};

export default FrontOfficeForm;
