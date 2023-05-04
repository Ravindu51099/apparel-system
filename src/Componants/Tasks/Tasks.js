import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();

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

  const columns = [
    {
      title: "Order",
      dataIndex: "order_id",
    },
    {
      title: "Task",
      dataIndex: "task_name",
    },
    {
      title: "Employee",
      dataIndex: "user_id",
    },
    {
      title: "Employee Time Spent on Task",
      dataIndex: "time_spent",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => editTask(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => deleteTask(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const addTask = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };

  const editTask = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...task,
      status: task.status || "Pending", // Set default status value
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    message.success("Task deleted successfully!");
  };

  // const handleOk = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       const newTask = {
  //         id: editingTask ? editingTask.id : tasks.length + 1,
  //         status: "Pending", // Add status property with initial value
  //         ...values,
  //       };
  //       if (editingTask) {
  //         const index = tasks.findIndex((t) => t.id === editingTask.id);
  //         setTasks([
  //           ...tasks.slice(0, index),
  //           newTask,
  //           ...tasks.slice(index + 1),
  //         ]);
  //         message.success("Task updated successfully!");
  //       } else {
  //         setTasks([...tasks, newTask]);
  //         message.success("Task added successfully!");
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
        const newTask = {
          id: editingTask ? editingTask.id : tasks.length + 1,
          status: "Pending",
          ...values,
        };
        if (editingTask) {
          const index = tasks.findIndex((t) => t.id === editingTask.id);
          setTasks([
            ...tasks.slice(0, index),
            newTask,
            ...tasks.slice(index + 1),
          ]);
          updateTask(newTask); // Send PUT request to update the task
        } else {
          setTasks([...tasks, newTask]);
          Taskadd(newTask); // Send POST request to add a new task
        }
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Error validating fields:", error);
      });
  };

  const updateTask = (task) => {
    fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating task");
        }
        message.success("Task updated successfully!");
      })
      .catch((error) => {
        console.log("Error updating task:", error);
        message.error("Error updating task");
      });
  };

  const Taskadd = (task) => {
    fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error adding task");
        }
        message.success("Task added successfully!");
      })
      .catch((error) => {
        console.log("Error adding task:", error);
        message.error("Error adding task");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={addTask} style={{ marginBottom: 16 }}>
        Add Task
      </Button>
      <Table columns={columns} dataSource={tasks} />

      <Modal
        title={editingTask ? "Edit Task" : "Add Task"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Order" name="order_id">
            <Input />
          </Form.Item>
          <Form.Item label="Task" name="task_name">
            <Input />
          </Form.Item>
          <Form.Item label="Employee" name="user_id">
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Time Spent on Task (in hours)"
            name="time_spent"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Tasks;
