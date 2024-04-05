import {
  Button,
  Form,
  InputNumber,
  Modal,
  Select,
  Table,
  notification,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { changeBalance, getAll } from "../../services/user.service";

import { useUserStore } from "../../store/user.store";

// import Columns from "./Setting";

import style from "./style.module.css";

const Users = () => {
  const client = useQueryClient();

  const [role, setRole] = useState("blogger");
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [formInstance, setFormInstance] = useState();
  const [user, setUser] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const owner = useUserStore((state) => state.user);

  const { data: users } = useQuery({
    queryFn: () => getAll(role),
    queryKey: ["users", role],
  });

  const { mutate } = useMutation({
    mutationFn: changeBalance,
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["users"],
      });
      api.success({
        message: data,
      });
    },
    onError: ({ message }) => {
      api.error({
        message: message,
      });
    },
  });

  useEffect(() => {
    setFormInstance(form);
  }, []);

  const handleOpen = (values) => {
    setOpen(true);
    setUser(values);
  };

  const handleSubmit = async () => {
    const values = await formInstance?.validateFields();
    formInstance?.resetFields();
    mutate({ id: user.id, value: values.sum });
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className={style.container}>
        <Select
          defaultValue={role}
          options={[
            owner.role === "manager"
              ? { value: "brand", label: "Brand" }
              : null,
            { value: "blogger", label: "Blogger" },
          ].filter(Boolean)}
          onChange={setRole}
          className={style.select}
        />

        {/* <Table
          bordered
          dataSource={users}
          rowKey="id"
          columns={Columns(handleOpen)}
        /> */}
        <Modal
          title="Add sum to user balance"
          open={open}
          onCancel={() => setOpen(!open)}
          footer={(_, { CancelBtn }) => (
            <>
              <CancelBtn />
              <Button onClick={handleSubmit} type="default">
                Change
              </Button>
            </>
          )}
        >
          <Form form={form} name="horizontal_login">
            <Form.Item
              name="sum"
              rules={[{ required: true, message: "Please input sum!" }]}
            >
              <InputNumber className={style.num} placeholder="sum" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Users;
