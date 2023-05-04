import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();

  useEffect(() => {
    fetch("http://localhost:8000/api/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer_id",
    },
    {
      title: "Material",
      dataIndex: "material_type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Print Available",
      dataIndex: "print_available",
    },
    {
      title: "Size",
      dataIndex: "required_size",
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

  const editOrder = (order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
    form.setFieldsValue(order);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success("Order deleted successfully!");
  };

  // const handleOk = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       const newOrder = {
  //         id: editingOrder ? editingOrder.id : orders.length + 1,
  //         ...values,
  //       };
  //       if (editingOrder) {
  //         const index = orders.findIndex((o) => o.id === editingOrder.id);
  //         setOrders([
  //           ...orders.slice(0, index),
  //           newOrder,
  //           ...orders.slice(index + 1),
  //         ]);

  //         message.success("Order updated successfully!");
  //       } else {
  //         setOrders([...orders, newOrder]);
  //         message.success("Order added successfully!");
  //       }
  //       form.resetFields();
  //       setIsModalVisible(false);
  //     })
  //     .catch((error) => {
  //       console.log("Error validating fields:", error);
  //     });
  // };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newOrder = {
          id: editingOrder ? editingOrder.id : orders.length + 1,
          ...values,
        };
        console.log(editingOrder.id);
        console.log(newOrder);
        const requestOptions = {
          method: editingOrder ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(newOrder),
        };
        const url = editingOrder
          ? `http://localhost:8000/api/orders/${editingOrder.id}`
          : "http://localhost:8000/api/orders";
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (editingOrder) {
              const index = orders.findIndex((o) => o.id === editingOrder.id);
              setOrders([
                ...orders.slice(0, index),
                data,
                ...orders.slice(index + 1),
              ]);
              window.location.reload();
              message.success("Order updated successfully!");
            } else {
              setOrders([...orders, data]);
              message.success("Order added successfully!");
            }
            form.resetFields();
            setIsModalVisible(false);
          })
          .catch((error) => {
            console.log("Error updating order:", error);
          });
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
      <h1>View All Orders</h1>
      {/* <Button type="primary" onClick={addOrder} style={{ marginBottom: 16 }}>
        Add Order
      </Button> */}
      <Table columns={columns} dataSource={orders} />

      <Modal
        title={editingOrder ? "Edit Order" : "Add Order"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Customer" name="customer_id">
            <Input />
          </Form.Item>
          <Form.Item label="Material" name="material_type">
            <Input />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Print Available" name="print_available">
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="required_size">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Orders;
