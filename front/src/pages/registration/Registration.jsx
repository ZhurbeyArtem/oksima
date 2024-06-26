import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import FormComponent from "../../components/form/Form";
import Links from "../../components/links/Links";
import { registration } from "../../services/auth.service";

import style from "./style.module.css";

const RegistrationPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: registration,
    onSuccess:  () => {
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
        <Links />
        <FormComponent method="registration" handleSubmit={mutate} />
      </div>
    </>
  );
};

export default RegistrationPage;
