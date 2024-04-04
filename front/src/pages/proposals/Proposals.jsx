import style from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAllProposal } from "../../services/proposal.service";
import { Table } from "antd";
import { columns } from "./setting";

const Proposals = () => {
  const { data } = useQuery({
    queryFn: getAllProposal,
    queryKey: ["proposals"],
  });

  const dataKey = data?.map((el) => ({
    ...el,
    key: el.id,
    bloggerConfirm: String(el.bloggerConfirm),
    brandConfirm: String(el.brandConfirm),
    sum: `${el.sum}$`,
  }));

  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };

  return (
    <div className={style.container}>
      <Table
        bordered
        dataSource={dataKey}
        columns={columns}
        {...defaultExpandable}
      />
    </div>
  );
};

export default Proposals;
