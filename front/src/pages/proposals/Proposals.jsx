import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, Table, notification } from "antd";

import { acceptProposal, getAllProposal } from "../../services/proposal.service";

import { Columns } from "./Setting";

import { useUserStore } from "../../store/user.store";

import style from "./style.module.css";

const Proposals = () => {
  const user = useUserStore((state) => state.user);
  const [api, contextHolder] = notification.useNotification();
  const client = useQueryClient();

  const [global, setGlobal] = useState("");
  const { data } = useQuery({
    queryFn: () => getAllProposal(global),
    queryKey: ["proposals", global],
  });

 const { mutate } = useMutation({
   mutationFn: acceptProposal,
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


  const dataKey = data?.map((el) => ({
    ...el,
    bloggerConfirm: String(el.bloggerConfirm),
    brandConfirm: String(el.brandConfirm),
    sum: `${el.sum}$`,
  }));

  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  return (
    <>
      {contextHolder}

      <div className={style.container}>
        <Select
          defaultValue={global}
          options={[
            { value: "", label: "All" },
            { value: `${user.id}`, label: "My" },
          ]}
          onChange={setGlobal}
          className={style.select}
        />
        <Table
          bordered
          dataSource={dataKey}
          columns={Columns(mutate)}
          {...defaultExpandable}
          rowKey="id"
          rowClassName="editable-row"
        />
      </div>
    </>
  );
};

export default Proposals;
