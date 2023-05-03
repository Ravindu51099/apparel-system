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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newTask = {
          id: editingTask ? editingTask.id : tasks.length + 1,
          status: "Pending", // Add status property with initial value
          ...values,
        };
        if (editingTask) {
          const index = tasks.findIndex((t) => t.id === editingTask.id);
          setTasks([
            ...tasks.slice(0, index),
            newTask,
            ...tasks.slice(index + 1),
          ]);
          message.success("Task updated successfully!");
        } else {
          setTasks([...tasks, newTask]);
          message.success("Task added successfully!");
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
          <Form.Item
            label="Order"
            name="order"
            rules={[{ required: true, message: "Please enter order number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Task"
            name="task"
            rules={[{ required: true, message: "Please enter task name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee"
            name="employee"
            rules={[{ required: true, message: "Please enter employee name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Time Spent on Task (in hours)"
            name="employeeTimeSpentOnTask"
            rules={[
              {
                required: true,
                message: "Please enter the time spent by employee on task!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please enter task status!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Tasks;
