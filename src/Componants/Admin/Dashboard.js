import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Progress } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Customers from "../Customers/Customer";
import Orders from "../Orders/Orders";
import Tasks from "../Tasks/Tasks";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design new website",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Write blog post",
      status: "Not Started",
    },
    {
      id: 3,
      title: "Create marketing plan",
      status: "Completed",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const percentageComplete = Math.round(
    (completedTasks.length / tasks.length) * 100
  );

  // Calculate the percentage of the day that has passed
  const percentageOfDayPassed =
    (currentTime.diff(moment().startOf("day"), "seconds") / 86400) * 100;

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Customers"
              value={Customers.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={7}>
          <Card>
            <Statistic
              title="Total Orders"
              value={Orders.length}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={9}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={Tasks.length}
              prefix={<CheckSquareOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="All Customers">
            <Customers />
          </Card>
        </Col>
        <Col span={7}>
          <Card title="All Orders">
            <Orders />
          </Card>
        </Col>
        <Col span={9}>
          <Card title="All Tasks">
            <Tasks />
          </Card>
        </Col>
      </Row>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 500, justifyContent: "center" }}>
          <h1>Dashboard</h1>
          <h2>Task Status</h2>
          <Row>
            <Progress type="circle" percent={percentageComplete} />
            {/* <Progress type="circle" percent={percentageOfDayPassed} /> */}
          </Row>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong> - {task.status}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Row justify="space-between" style={{ marginTop: "24px" }}>
        <Col>{currentTime.format("MMMM Do YYYY")}</Col>

        <Col>{currentTime.format("h:mm:ss a")}</Col>
      </Row>
    </>
  );
};

export default Dashboard;
// import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Statistic, Progress } from "antd";
// import { filter } from "lodash";
// import {
//   UserOutlined,
//   ShoppingOutlined,
//   CheckSquareOutlined,
// } from "@ant-design/icons";
// import moment from "moment";
// import Customers from "../Customers/Customer";
// import Orders from "../Orders/Orders";
// import Tasks from "../Tasks/Tasks";

// const Dashboard = () => {
//   const [currentTime, setCurrentTime] = useState(moment());
//   const [completedTasks, setCompletedTasks] = useState([100]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(moment());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const tasks = Tasks.filter((task) => task.completed);
//     setCompletedTasks(tasks);
//   }, []);

//   const tasksPercentage = (completedTasks.length / Tasks.length) * 100;

//   return (
//     <>
//       <Row gutter={16}>
//         <Col span={8}>
//           <Card>
//             <Statistic
//               title="Total Customers"
//               value={Customers.length}
//               prefix={<UserOutlined />}
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card>
//             <Statistic
//               title="Total Orders"
//               value={Orders.length}
//               prefix={<ShoppingOutlined />}
//             />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card>
//             <Statistic
//               title="Total Tasks"
//               value={Tasks.length}
//               prefix={<CheckSquareOutlined />}
//             />
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={16}>
//         <Col span={8}>
//           <Card title="All Customers">
//             <Customers />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card title="All Orders">
//             <Orders />
//           </Card>
//         </Col>
//         <Col span={8}>
//           <Card title="All Tasks">
//             <Tasks />
//             <div style={{ marginTop: "16px" }}>
//               <Progress percent={tasksPercentage} type="circle" />
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Row justify="space-between" style={{ marginTop: "24px" }}>
//         <Col>{currentTime.format("MMMM Do YYYY")}</Col>
//         <Col>{currentTime.format("h:mm:ss a")}</Col>
//       </Row>
//     </>
//   );
// };

// export default Dashboard;
