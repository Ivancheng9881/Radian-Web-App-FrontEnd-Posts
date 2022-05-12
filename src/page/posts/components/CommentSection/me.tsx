import React, {
  useState,
  FC,
  useEffect,
} from "react";
import SmallReply from "./smallreply";

import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import photo from "../PostsSection/unsplash_y3kC_7Qhmjkjohndoe.png"

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Name = "John Doe";
const Time = "5 min ago";
const TitleText = "Enjoy the real Web 3 Social experience!";
const ContentText =
  "From now on, I get to own my content and connections! Great news, my friends <3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.";

const StyledContainer = styled(Container)`
  background-color: white;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 35px;
  padding-bottom: 25px;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.1);
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
`

const Wrapper = styled.div`
  padding-left: 10px;
  position: relative;
  margin-bottom: 10px;
`;

const StyledButton = styled.button`
  font-size: 12px;
  text-align: start;
  color: #5829E3
`;

const StyledIndentedReplyContainer = styled.div`
  position: relative;
  width: 90%;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
`

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("");
  const generateColor = () => {
    setColor(Math.random().toString(16).substr(-6));
  };
  return { color, generateColor };
};


function Me() {
  const { color, generateColor } = useGenerateRandomColor();
  // const { likes, setLikes } = useState(0);

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <Wrapper style={{ backgroundColor: "#" + color }}>
      <StyledContainer fluid>
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
        <StyledIndentedReplyContainer>
        <SmallReply />
        <SmallReply />
        <SmallReply />
        </StyledIndentedReplyContainer>
      </StyledContainer>
    </Wrapper>
  )
}

export default Me;