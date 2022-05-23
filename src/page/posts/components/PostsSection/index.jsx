import React, { useState, FC, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import photo from "./unsplash_y3kC_7Qhmjkjohndoe.png";
import SettingLayout from "../../../settings/components/SettingLayout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModalComment from "../CommentSection/ModalComment";

const StyledRow = styled(Row)``;

const StyledPhoto = styled.img`
  width: 50px;
  height: 50px;
`;

const StyledTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
`;

const StyledContentText = styled.p`
  font-size: 13px;
`;

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("");
  const generateColor = () => {
    setColor(Math.random().toString(16).substr(-6));
  };
  return { color, generateColor };
};

const PostsSection = (props) => {
  const { color, generateColor } = useGenerateRandomColor();
  const [liked, updateLiked] = useState(false);
  const [likes, updateLikes] = useState(20);
  const [hasLiked, setHasLiked] = useState(false);
  const [saved, updateSaved] = useState(false);

  const handleSaved = () => {
    updateSaved(!saved);
  };

  const handleChange = () => {
    updateLiked(!liked);
    setHasLiked(true);
  };

  useEffect(() => {
    if (liked === true) {
      updateLikes(likes + 1);
    }
    if (liked === false && hasLiked === true) {
      updateLikes(likes - 1);
    }
  }, [liked]);

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <div
      className="rd-post-color-container-main"
      style={{ backgroundColor: "#" + color }}
    >
      <div className="rd-post-color-inner-wrapper">
        <StyledRow>
          <div id="controls"></div>

          <div>
            <div className="rd-post-header-container">
              <div className="rd-post-profile-pic-wrapper">
                <StyledPhoto src={photo} alt="profilepic" />
              </div>
              <div className="rd-post-header-item-wrapper">
                <div>{props.postData.createdBy}</div>
                <div>{props.postData.createdAt}</div>
              </div>

              <div className="rd-post-bookmark-wrapper">
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkIcon />}
                      name="checkedBookmark"
                      onClick={handleSaved}
                    />
                  }
                />
              </div>
            </div>
          </div>
          <StyledRow>
            <div className="rd-post-body-container">
              <StyledTitle>{props.postData.postId}</StyledTitle>
              <StyledContentText>{props.postData.content}</StyledContentText>
            </div>
            <div className="rd-post-likes-container">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                      onClick={handleChange}
                    />
                  }
                  label={`${likes}` + " likes"}
                />
              </div>

              <div className="rd-post-reply-to-wrapper">
                <ModalComment refId={props.postData.postId} />
              </div>
            </div>
          </StyledRow>
        </StyledRow>
      </div>
    </div>
  );
};

export default PostsSection;
