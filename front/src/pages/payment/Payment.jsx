import { useEffect, useState } from "react";
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

import {
  getPayments,
  createPayment,
  closePayment,
} from "../../services/payment.service";

import Columns from "./Setting";

import style from "./style.module.css";

const Payment = () => {
  const [status, setStatus] = useState("waiting");
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const client = useQueryClient();
  const [formInstance, setFormInstance] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    setFormInstance(form);
  }, []);

  const { data: payments } = useQuery({
    queryFn: () => getPayments(status),
    queryKey: ["payments", status],
  });

  const { mutate: create } = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["payments"],
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
  const { mutate: close } = useMutation({
    mutationFn: closePayment,
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["payments"],
      });
      console.log(data);
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

  const handleClose = (record, newStatus) => {
    close({ id: record.id, newStatus });
  };

  const handleSubmit = async () => {
    const values = await formInstance?.validateFields();
    formInstance?.resetFields();
    create(values);
    setOpen(false);
  };
  return (
    <>
      {contextHolder}
      <div className={style.container}>
        <div className={style.topSection}>
          <Select
            defaultValue={status}
            options={[
              { value: "waiting", label: "Waiting" },
              { value: "finished", label: "Finished" },
              { value: "rejected", label: "Rejected" },
            ]}
            onChange={setStatus}
            className={style.select}
          />
          <Button type="primary" onClick={() => setOpen(!open)}>
            Add payment
          </Button>
        </div>
        <Table
          bordered
          dataSource={payments}
          rowKey="id"
          columns={Columns(handleClose)}
        />
      </div>
      <Modal
        title="Add payout"
        open={open}
        onCancel={() => setOpen(!open)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button onClick={handleSubmit} type="default">
              Create proposal
            </Button>
          </>
        )}
      >
        <Form form={form} name="horizontal_login">
          <Form.Item name="transferFromId">
            <InputNumber
              className={style.num}
              min={1}
              placeholder="Transfer from id. If you wanna just deposit account, skip this field "
            />
          </Form.Item>
          <Form.Item
            name="transferToId"
            rules={[{ required: true, message: "Please input id!" }]}
          >
            <InputNumber
              className={style.num}
              min={1}
              placeholder="Transfer to id"
            />
          </Form.Item>
          <Form.Item
            name="sum"
            rules={[{ required: true, message: "Please input sum!" }]}
          >
            <InputNumber className={style.num} min={1} placeholder="sum" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Payment;
