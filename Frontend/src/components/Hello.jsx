import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Avatar, Card, Button, message, Popconfirm } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

export default function Hello() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:3000/product")
        .then((res) => {
          console.log("DATA: ", res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData()
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  // <div>
  //   {data.map((item) => {
  //     return <div>{item.name}</div>;
  //   })}
  // </div>
  return (
    data.map((item) => {
      return (
        <Card
          style={{
            width: 300,
          }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <Popconfirm title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <SettingOutlined key="setting" />
            </Popconfirm>,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
          hoverable
        >
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={item.name}
            description="This is the description"
          />
          <div className="underline font-bold text-2xl">TAILWIND</div>
        </Card>
      );
    })
  )
}

