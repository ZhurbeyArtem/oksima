import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import FormComponent from "../../components/form/Form";
import Links from "../../components/links/Links";

import { login } from "../../services/auth.service";
import { useUserStore } from "../../store/user.store";

import style from "./style.module.css";

const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const setIsAuth = useUserStore((state) => state.setIsAuth);


  
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
      setIsAuth()
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
        <FormComponent method="login" handleSubmit={mutate} />
      </div>
    </>
  );
};

export default LoginPage;
