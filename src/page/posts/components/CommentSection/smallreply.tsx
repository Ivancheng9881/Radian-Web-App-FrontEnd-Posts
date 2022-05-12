import React, { useState, FC, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import photo from "../PostsSection/unsplash_y3kC_7Qhmjkjohndoe.png";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Name = "John Doe";
const Time = "5 min ago";
const TitleText = "Enjoy the real Web 3 Social experience!";
const ContentText =
  "From now on, I get to own my content and connections! Great news, my friends <3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.";

const StyledRow = styled(Row)``;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: row;
`;

const StyledPhoto = styled.img`
  width: 35px;
  height: 35px;
`;

const StyledName = styled.p`
  font-size: 10px;
  font-weight: 600;
`;

const StyledLightFont = styled.p`
  font-size: 8px;
  font-weight: 100;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const StyledTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
`;

const StyledContentText = styled.p`
  font-size: 13px;
  margin-bottom: 0;
`;

const StyledDiv2 = styled.div`
  padding: 0;
  margin-top: 10px;
  margin-left: 5px;
  width: 100%;
  line-height: 2px;
`;

const StyledDiv3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;


const StyledButton = styled.button`
  font-size: 12px;
  text-align: start;
  color: #5829E3
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: 70px;
`;

function SmallReply() {
  return (
    <StyledRow>
      <StyledCol>
        <StyledPhoto src={photo} alt="profilepic" />
        <StyledDiv>
          <StyledDiv2>
            <StyledName>{Name}</StyledName>
            <StyledLightFont>{Time}</StyledLightFont>
          </StyledDiv2>
          <StyledDiv3>
            <StyledContentText>{ContentText}</StyledContentText>
            <StyledButton>Reply to</StyledButton>
          </StyledDiv3>
        </StyledDiv>
      </StyledCol>
    </StyledRow>
  );
}

export default SmallReply;
