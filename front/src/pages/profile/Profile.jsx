import { Button, Form, Input, notification } from "antd";
import style from "./style.module.css";
import { useUserStore } from "../../store/user.store";
import { useMutation } from "@tanstack/react-query";
import { changeName } from "../../services/user.service";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  const [api, contextHolder] = notification.useNotification();

  const { mutate } = useMutation({
    mutationFn: changeName,
    onSuccess: (message) => {
      api.success({
        message: message,
      });
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
        <Form onFinish={mutate}>
          <Form.Item
            label="First name"
            name="firstName"
            initialValue={user.firstName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            initialValue={user.lastName}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Profile;
