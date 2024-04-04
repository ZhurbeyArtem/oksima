import { Button } from "antd";

const Columns = (handleSubmit) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Button onClick={() => handleSubmit(record)}>Change balance</Button>
      ),
    },
  ];
};
export default Columns;
