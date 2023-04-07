import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      product: "Laptop",
      quantity: 2,
    },
    {
      id: 2,
      customer: "Jane Doe",
      product: "Phone",
      quantity: 3,
    },
  ]);

  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => editOrder(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteOrder(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const addOrder = () => {
    setEditingOrder(null);
    setIsModalVisible(true);
  };

  const editOrder = (order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
    form.setFieldsValue(order);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success("Order deleted successfully!");
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newOrder = {
          id: editingOrder ? editingOrder.id : orders.length + 1,
          ...values,
        };
        if (editingOrder) {
          const index = orders.findIndex((o) => o.id === editingOrder.id);
          setOrders([
            ...orders.slice(0, index),
            newOrder,
            ...orders.slice(index + 1),
          ]);
          message.success("Order updated successfully!");
        } else {
          setOrders([...orders, newOrder]);
          message.success("Order added successfully!");
        }
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Error validating fields:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={addOrder} style={{ marginBottom: 16 }}>
        Add Order
      </Button>
      <Table columns={columns} dataSource={orders} />

      <Modal
        title={editingOrder ? "Edit Order" : "Add Order"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Customer"
            name="customer"
            rules={[{ required: true, message: "Please enter customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, message: "Please enter product name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter product quantity!" },
              {
                type: "number",
                min: 1,
                max: 100,
                message: "Quantity must be between 1 and 100!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Orders;
