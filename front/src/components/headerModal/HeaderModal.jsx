import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';

const { Option } = Select;



const HeaderModal = ({style, setOpen ,handleSubmit, categories, open, form}) => {
  return (
    <Modal
      title="Add proposal"
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
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="sum"
          rules={[{ required: true, message: "Please input sum!" }]}
        >
          <InputNumber className={style.num} min={1} placeholder="sum" />
        </Form.Item>
        <Form.Item
          name="categoryId"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select placeholder="select category">
            {categories?.map((el) => (
              <Option key={el.id} value={el.id}>
                {el.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default HeaderModal