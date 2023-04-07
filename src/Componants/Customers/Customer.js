import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom";

const CustomersTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [data, setData] = useState([]);

  // const history = useHistory();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const Details = [
    {
      key: '1',
      name: 'John Brown',
      email: 'john.brown@example.com',
      address: 'New York City',
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 'jim.green@example.com',
      address: 'Los Angeles',
    },
    {
      key: '3',
      name: 'Joe Black',
      email: 'joe.black@example.com',
      address: 'Chicago',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newData = [...data, values];
        setData(newData);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const showEditModal = (record) => {
    editForm.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    editForm
      .validateFields()
      .then((values) => {
        const newData = data.map((item) => {
          if (item.key === values.key) {
            return { ...item, ...values };
          }
          return item;
        });
        setData(newData);
        editForm.resetFields();
        setIsEditModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEditCancel = () => {
    editForm.resetFields();
    setIsEditModalVisible(false);
  };

  const handleDelete = (record) => {
    const newData = data.filter((item) => item.key !== record.key);
    setData(newData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Customer
        </Button>
      </div>
      <Table columns={columns} dataSource={Details} />
      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="add_customer"
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input customer email!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Customer"
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Form
          form={editForm}
          name="edit_customer"
          onFinish={handleEditOk}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input customer name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input customer email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="key" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default CustomersTable;
