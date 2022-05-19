import React from "react";
import {
  HomeOutlined,
  DollarCircleOutlined,
  TeamOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const LeftSideBar = () => {
  return (
    <div className="rd-left-side-list-wrapper">
      <div className="rd-left-side-item">
          <HomeOutlined style={{fontSize:"30px"}}/>
          Home
      </div>
      <div className="rd-left-side-item">
          <DollarCircleOutlined style={{fontSize:"30px"}}/>
          Token
      </div>
      <div className="rd-left-side-item">
          <TeamOutlined style={{fontSize:"30px"}}/>
          Social
      </div>
      <div className="rd-left-side-item">
          <BookOutlined style={{fontSize:"30px"}}/>
          Bookmarks
      </div>
      <div className="rd-left-side-item">
      <SettingOutlined style={{fontSize:"30px"}}/>
      Filter
      </div>
    </div>
  );
};

export default LeftSideBar;
