import React, {
  createElement,
  useState,
  FC,
  useContext,
  useEffect,
} from "react";

import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

import photo from "./unsplash_y3kC_7Qhmjkjohndoe.png";

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
  padding-left: 45px;
  padding-right: 35px;
  padding-bottom: 25px;
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
`;

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("");
  const generateColor = () => {
    setColor(Math.random().toString(16).substr(-6));
  };
  return { color, generateColor };
};

const PostsSection = () => {
  const { color, generateColor } = useGenerateRandomColor();
  const { likes, setLikes } = useState(0);

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
                <StyledName>{Name}</StyledName>
                <StyledLightFont>{Time}</StyledLightFont>
              </StyledDiv2>
            </StyledDiv>
          </StyledCol>
          <StyledRow>
            <StyledCol>
              <StyledDiv>
                <StyledTitle>{TitleText}</StyledTitle>
                <StyledContentText>{ContentText}</StyledContentText>
              </StyledDiv>
            </StyledCol>
          </StyledRow>
          <StyledRow>
            <StyledCol>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                  label="15 likes"
                />
              </div>
              <StyledButton>reply to</StyledButton>
            </StyledCol>
          </StyledRow>
        </StyledRow>
      </StyledContainer>
    </Wrapper>
  );
};

export default PostsSection;
