import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "../../store/user.store";

import { getCategories } from "../../services/category.service";
import { createProposal } from "../../services/proposal.service";

import HeaderModal from "../headerModal/HeaderModal";

import style from "./style.module.css";


const Header = () => {
  const user = useUserStore((state) => state.user);
  const client = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [formInstance, setFormInstance] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    setFormInstance(form);
  }, []);

  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: [],
  });
  const { mutate } = useMutation({
    mutationFn: createProposal,
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["proposals"],
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

  const handleSubmit = async () => {
    const values = await formInstance?.validateFields();
    formInstance?.resetFields();
    mutate(values);
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <div className={style.container}>
        <ul className={style.list}>
          {user.role === "manager" && (
            <li
              className={`${style.item} ${style.link}`}
              onClick={() => setOpen(!open)}
            >
              Add proposals
            </li>
          )}
          <li className={style.item}>
            <Link className={style.link} to="payments">
              Payments
            </Link>
          </li>
        </ul>
      </div>
      <HeaderModal
        style={style}
        setOpen={setOpen}
        handleSubmit={handleSubmit}
        categories={categories}
        open={open}
        form={form}
      />
    </>
  );
};

export default Header;
