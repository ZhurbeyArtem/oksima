import { Button, Flex, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "../../services/auth.service";

import { useUserStore } from "../../store/user.store";

import style from "./style.module.css";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const user = useUserStore((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
    },
    onError: ({ message }) => {
      api.error({
        message: message,
      });
    },
  });
  return (
    <>
      {contextHolder}
      <div className={style.container}>
        <Form
          className={style.form}
          name="basic"
          onFinish={(data) => mutate({ ...data, email: user.email })}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your Code!",
              },
            ]}
          >
            <Input.OTP length={4} />
          </Form.Item>
          <Form.Item
            label="New password"
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
          <Form.Item className={style.btn}>
            <Flex vertical>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
