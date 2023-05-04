import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../../../App.css";

import Orders from "../../Orders/Orders";
import Tasks from "../../Tasks/Tasks";
import Dashboard from "../Dashboard";

const { Sider, Content } = Layout;

function Sidebar() {
 

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/customers">View All Customers</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShoppingOutlined />}>
              <Link to="/orders">View All Orders and Progress Status</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ClockCircleOutlined />}>
              <Link to="/tasks">View Employee Tasks and Time</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "16px" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
            </div>
          </Content>
        </Layout>
      </Layout>
  );
}

export default Sidebar;
