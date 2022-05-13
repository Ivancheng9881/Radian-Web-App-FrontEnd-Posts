import React, { useState, FC, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import photo from "./unsplash_y3kC_7Qhmjkjohndoe.png";




const StyledContainer = styled(Container)`
  background-color: white;
  padding-top: 25px;
  padding-left: 45px;
  padding-right: 35px;
  padding-bottom: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const StyledRow = styled(Row)``;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: row;
`;

const StyledPhoto = styled.img`
  width: 50px;
  height: 50px;
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
`;

const StyledDiv2 = styled.div`
  padding: 0;
  margin-top: 10px;
  margin-left: 5px;
  text-align: center;
  line-height: 2px;
`;

const Wrapper = styled.div`
  padding-left: 10px;
  position: relative;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  font-size: 12px;
  color: #5829e3;
`;

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("");
  const generateColor = () => {
    setColor(Math.random().toString(16).substr(-6));
  };
  return { color, generateColor };
};



const PostsSection = (props) => {
  const { postData } = props;
  const { color, generateColor } = useGenerateRandomColor();

  console.log(postData)





  useEffect(() => {
    generateColor();
  }, []);

  return (
    <Wrapper style={{ backgroundColor: "#" + color }}>
      <StyledContainer fluid>
        <StyledRow>
          <StyledRow></StyledRow>
          <StyledCol>
            <StyledPhoto src={photo} alt="profilepic" />
            <StyledDiv>
              <StyledDiv2>
                <StyledName>{postData.createdBy}</StyledName>
                <StyledLightFont>{postData.createdAt}</StyledLightFont>
              </StyledDiv2>
            </StyledDiv>
          </StyledCol>
          <StyledRow>
            <StyledCol>
              <StyledDiv>
                <StyledTitle>{postData.postId}</StyledTitle>
                <StyledContentText>{postData.content}</StyledContentText>
              </StyledDiv>
            </StyledCol>
          </StyledRow>
        </StyledRow>
      </StyledContainer>
    </Wrapper>
  );
};

export default PostsSection;
