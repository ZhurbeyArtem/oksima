import { Button, Form, Input, Select } from "antd";
import style from "./style.module.css";
import { Link, useLocation } from "react-router-dom";
const { Option } = Select;

const FormComponent = ({ method, handleSubmit }) => {
  const location = useLocation();
  const isManager = location.pathname.split("/").includes("manager");

  return (
    <Form
      className={style.form}
      name="basic"
      onFinish={handleSubmit}
      autoComplete="off"
      labelCol={{
        span: 6,
      }}
      labelAlign="left"
    >

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {method === "registration" && (
        <>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="blogger">Blogger</Option>
              <Option value="brand">Brand</Option>
              {isManager && <Option value="manager">Manager</Option>}
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item className={style.btn}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {method === "login" && (
          <Link className={style.link} to="/forgot">
            forgot password?
          </Link>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
