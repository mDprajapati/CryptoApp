import { Button, Col, message, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import Pageheader from "./pageheader";
import { useDispatch, useSelector } from "react-redux";
import { getIdInfo } from "../redux/crypto/crypto-selector";
import { setIdData } from "../redux/crypto/crypto-actions";
import axios from "axios";
import { baseUrl } from "../api/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined, FundViewOutlined } from "@ant-design/icons";
import moment from "moment";
import '../App.css'
function CryptoList() {
  const columns = [
    {
      align: "centre",
      title: "#",
      dataIndex: "market_data",
      key: "market_data",
      width: '5%',
      render: (market_data) => <h3 className="__text_align">{market_data.market_cap_rank}</h3>,
    },
    {
      align: 'centre',
      title: "Currency Image",
      dataIndex: "image",
      key: "image",
      width: '10%',
      render: (image) => <div className="__text_align"><img   src={image.thumb} alt="" /></div>,
    },
    {
      align: 'centre',
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: '20%',
      render: (name) =><h3>{name}</h3>,
    },
    {
      align: 'centre',
      title: "24h",
      dataIndex: "market_data",
      key: "market_data",
      width: '10%',
      render: (market_data) => <h3 className="__text_align">{market_data.price_change_percentage_24h_in_currency.usd}%</h3>,
    },
    {
      align: 'centre',
      title: "7d",
      dataIndex: "market_data",
      key: "market_data",
      width: '10%',
      render: (market_data) => <h3 className="__text_align">{market_data.price_change_percentage_7d_in_currency.usd}%</h3>,
    },
    {
      align: 'centre',
      title: "Exchange Trade Volume",
      dataIndex: "market_data",
      key: "market_data",
      width: '10%',
      render: (market_data) => <h3 className="__text_align">${convertToInternationalCurrencySystem(market_data.total_volume.usd)}</h3>,
    },
    {
      align: 'centre',
      title: "Last Updated",
      dataIndex: "last_updated",
      key: "last_updated",
      width: '10%',
      render: (last_updated) => <h3 className="__text_align">{moment(last_updated).format('MM-DD-YYYY')}</h3>,
    },
    
    {
      align: 'centre',
      title: "Action",
      key: "action",
      width: '10%',
      render: (_, record) => (
        <Space size="middle" className="__text_align">
          <Link
            to={{
              pathname: `/detail/${record.id}`,
            }}
          >
          <Button onClick={() => setId(record.id)} type="primary" shape="round" icon={<EyeOutlined />} size={'middle'} />
          </Link>
        </Space>
      ),
    },
  ];
  // const dispatch = useDispatch()
  // const cryptoData = useSelector(getCryptoInfo)
  const [datas, setData] = useState([]);
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate();
  const getIdData = useSelector(getIdInfo)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getAPICall();
  }, []);

  function convertToInternationalCurrencySystem (labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e+9
    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e+6
    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e+3
    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));

}
  const setId = (id) => {
    
    if(id){
      localStorage.setItem('id',id)
      dispatch(setIdData(id))
    }
    // if (id) {
    //   navigate(`detail/${id}`);
    // } else {
    //   message.error("Id not found");
    // }
  };

  const getAPICall = async () => {
    setLoader(true)
    await axios
      .get(baseUrl)
      .then((res) => {
        if (res.status === 200) {
          let array = [];
          for (let i = 0; i < 5; i++) {
            array.push(res.data[i]);
          }
          console.log(array);
          if (array.length > 0) {
            setData(array);
            setLoader(false)
            
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onRowClick = (event, record) =>{
    localStorage.setItem('id',record.id)
     navigate(`/detail/${record.id}`)
}


  return (
    <div>
      <Pageheader />
      <Row>
        <Col xl={{span:24}}>
      <Table
      onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => { onRowClick(event, record) },
                    };
                }}
      className="__table__adjust"
      pagination={false} 
      columns={columns} 
      dataSource={datas} 
      loading={loader === true ? true : false}
      title={() => <h1>Top 5 Cryptocurrency by Market Cap</h1>}
      />
        </Col>
      </Row>
    </div>
  );
}

export default CryptoList;
