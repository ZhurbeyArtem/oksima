import { Card, Col, Row } from "antd";
import style from "./style.module.css";

const Support = () => {
  const cardsData = [
    "Card title 1",
    "Card title 2",
    "Card title 3",
    "Card title 4",
    "Card title 5",
    "Card title 6",
    "Card title 7",
    "Card title 8",
  ];

  return (
    <div className={style.container}>
      <Row gutter={[16, 24]}>
        {cardsData.map((title, index) => (
          <Col span={12} key={index}>
            <Card title={title} bordered={true}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              fugiat quia eveniet eligendi quae vel autem quisquam facilis iure
              repellat tempora qui, rem illo suscipit excepturi obcaecati ex ea.
              Totam?
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Support;
