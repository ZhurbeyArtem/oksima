import { Button } from "antd";

export const Columns = (mutate) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sum",
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.name,
    },
    {
      title: "Blogger confirm",
      dataIndex: "bloggerConfirm",
      key: "bloggerConfirm",
    },
    {
      title: "Blogger id",
      dataIndex: "bloggerId",
      key: "bloggerId",
    },
    {
      title: "Brand confirm",
      dataIndex: "brandConfirm",
      key: "brandConfirm",
    },
    {
      title: "Brand id",
      dataIndex: "brandId",
      key: "brandId",
    },
    {
      title: "Creator id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
        onClick={() => mutate(record.id)}
        >
          Take this proposal
        </Button>
      ),
    },
  ];
};
