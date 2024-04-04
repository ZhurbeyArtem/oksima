import { Button, Flex, Form, Input, notification } from "antd";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/auth.service";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      navigate("/reset");
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
          onFinish={mutate}
          autoComplete="off"
          layout="vertical"
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

export default ForgotPassword;
