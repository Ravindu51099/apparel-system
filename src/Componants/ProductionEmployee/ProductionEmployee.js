import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const ProductionPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Assemble ZerOne T-Shirts",
      status: "Pending",
      assignedTo: "John Doe",
      time: null,
    },
    {
      id: 2,
      description: "Packing Araliya Hotel Order",
      status: "In Progress",
      assignedTo: "Jane Smith",
      time: 2.5,
    },
    {
      id: 3,
      description: "Inspect The Pack Order",
      status: "Completed",
      assignedTo: "Joe Black",
      time: 1.75,
    },
    {
      id: 4,
      description: "Paint Product D",
      status: "Pending",
      assignedTo: "Emily White",
      time: null,
    },
  ]);
  const [orders, setOrders] = useState([
    {
      id: 1001,
      name: "Acme Inc.",
      materialType: "180",
      quantity: 50,
      print: "Yes",
      size:"L",
      status: "In Progress",
    },
    {
      id: 1002,
      name: "XYZ Corporation",
      materialType: "210",
      quantity: 25,
      print: "Yes",
      size:"S/M",
      status: "Pending",
    },
    {
      id: 1003,
      name: "ABC Corp.",
      materialType: "180",
      quantity: 100,
      print: "No",
      size:"S/M/L",
      status: "Completed",
    },
    {
      id: 1004,
      name: "Smith & Co.",
      materialType: "220",
      quantity: 75,
      print: "Yes",
      size:"M/L",
      status: "In Progress",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [workTime, setWorkTime] = useState(null);
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

  // Function to fetch tasks and orders from the server
  // const fetchData = async () => {
  //   const taskResponse = await fetch("/api/tasks");
  //   const taskData = await taskResponse.json();
  //   setTasks(taskData);

  //   const orderResponse = await fetch("/api/orders");
  //   const orderData = await orderResponse.json();
  //   setOrders(orderData);
  // };

  // Function to handle selecting a task
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setVisible("task");
  };

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

  // Function to handle submitting a new task
  const handleTaskSubmit = (values) => {
    const newTask = {
      id: tasks.length + 1,
      description: values.description,
      status: "Not Started",
      assignedTo: values.assignedTo,
      time: 0,
    };
    setTasks([...tasks, newTask]);
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
    }
    
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Button
    //       type="primary"
    //       onClick={() => handleTaskSelect(record)}
    //       disabled={record.status !== "In Progress"}
    //     >
    //       Start Task
    //     </Button>
    //   ),
    // },
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
    // {
    //   title: "Time",
    //   dataIndex: "time",
    //   key: "time",
    //   render: (_, record) => (
    //     <Button type="primary" onClick={() => setSelectedTask(record)}>
    //       Enter Time
    //     </Button>
    //   ),
    // },
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
    </div>
  );
};
export default ProductionPage;
