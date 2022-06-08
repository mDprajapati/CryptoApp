import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../api/baseUrl";
import { getIdInfo } from "../redux/crypto/crypto-selector";
import Pageheader from "./pageheader";
import "../App.css";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  message,
  Row,
  Statistic,
  Typography,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  HomeOutlined,
  LeftOutlined,
  LineChartOutlined,
  MonitorOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;
let str = "";
const CryptoDetail = () => {
  const [loader,setLoader] = useState(false)
  const [data, setData] = useState();
  const [img, setDataImg] = useState();
  const [price, setDataPrice] = useState();
  const [cprice, setDataCPrice] = useState();
  const [dataDesc, setDataDesc] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id != null) {
      axios
        .get(baseUrl + id)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.name);
            setDataImg(res.data.image.small);
            setDataPrice("₹" + res.data.market_data.current_price.inr);
            setDataCPrice("$" + res.data.market_data.current_price.usd);
            setDataDesc(res.data.description.en);
            debugger;
          }
        })
        .catch((err) => {
          message.error(err)
          console.log(err);
        });
    }
  }, []);

  if (dataDesc) {
    var yourString = dataDesc;
    var maxLength = 510;
    var trimmedString = yourString.substr(0, maxLength);
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    );
    debugger;
    console.log(trimmedString);
    str = trimmedString;
    // setDataDesc(trimmedString)
  }

  return (
    <>
      <Pageheader />
      <Row>
        <Col xl={{ span: 24 }}>
          {/* <Divider /> */}
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined style={{ width: "50px", fontSize: "20px" }} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <h3>{data}</h3>
            </Breadcrumb.Item>
          </Breadcrumb>
          {/* <Divider /> */}
        </Col>
      </Row>
      <Card
        style={{ marginLeft: "4rem" }}
        // className="__card__adjust"
        actions={[
          <Button
            onClick={() => navigate(`/`)}
            type="primary"
            shape="round"
            icon={<LeftOutlined />}
            size={"middle"}
          >
            Back
          </Button>,
        ]}
      >
        <Meta
          avatar={<Avatar style={{ marginTop: ".5rem" }} src={img} />}
          title={<h1>{data}</h1>}
        />
        <Divider />
        <Row>
          <Col span={6}>
            <Meta
              avatar={<LineChartOutlined style={{ fontSize: "20px" }} />}
              description={<Statistic title="Price" value={price} />}
            />
          </Col>
          <Col span={6}>
            <Meta
              avatar={<MonitorOutlined style={{ fontSize: "20px" }} />}
              description={
                <Statistic
                  title=" Market Capital Price"
                  value={cprice}
                  precision={2}
                />
              }
            />
          </Col>
          <Typography>
            <Divider />
            <Title>Description</Title>
            <Paragraph>{str}</Paragraph>
          </Typography>
        </Row>
      </Card>
    </>
  );
};

export default CryptoDetail;
