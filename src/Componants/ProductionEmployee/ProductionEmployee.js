import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";

const ProductionPage = () => {
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
    // window.location.reload(); // or redirect to a login page
  };

  const LogoutButton = () => {
    return <Button onClick={handleLogout}>Logout</Button>;
  };

  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  }, []);

  // Function to handle submitting work time
  const handleTimeSubmit = (values) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          time: task.time
            ? task.time + parseFloat(values.time)
            : parseFloat(values.time),
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setVisible(false);
  };

  // Define columns for the Orders table
  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Material Type",
      dataIndex: "material_type",
      key: "material_type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Print Available",
      dataIndex: "print_available",
      key: "print_available",
    },
    {
      title: "Size",
      dataIndex: "required_size",
      key: "required_size",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Define columns for the Tasks table
  const taskColumns = [
    {
      title: "Task ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "task_name",
      key: "task_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Time Spent",
      dataIndex: "time_spent",
      key: "time_spent",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Production Employee Page</h1>
      <h2>Orders</h2>
      <Table
        dataSource={orders}
        columns={orderColumns}
        rowKey="id"
        pagination={false}
      />
      <h2>Tasks</h2>
      <Table
        dataSource={tasks}
        columns={taskColumns}
        rowKey="id"
        pagination={false}
      />
      <Modal
        title={`Enter Time for Task ${selectedTask ? selectedTask.id : ""}`}
        visible={visible === "task"}
        onCancel={() => {
          setSelectedTask(null);
          setVisible(false);
        }}
        footer={null}
      >
        <Form onFinish={handleTimeSubmit}>
          <Form.Item
            name="time"
            rules={[
              { required: true, message: "Please enter time worked on task" },
            ]}
          >
            <Input type="number" placeholder="Time Worked (hours)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Time
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginBottom: 16 }}>
        <LogoutButton />
      </div>
    </div>
  );
};
export default ProductionPage;
