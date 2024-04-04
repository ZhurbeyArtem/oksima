import { Button } from "antd";
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons";

import style from "./style.module.css";

const Columns = (handleClose) => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transfer from id",
      dataIndex: "transferFromId",
      key: "transferFromId",
    },
    {
      title: "Transfer to id",
      dataIndex: "transferToId",
      key: "transferToId",
    },
    {
      title: "Sum",
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <div className={style.btns}>
          <Button className={style.btn} onClick={() => handleClose(record, "rejected")}>
            <CloseCircleFilled className={style.icons} />
          </Button>
          <Button className={style.btn} onClick={() => handleClose(record, "finished")}>
            <CheckCircleFilled className={style.icons} />
          </Button>
        </div>
      ),
    },
  ];
};
export default Columns;
