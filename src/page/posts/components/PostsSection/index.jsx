import { useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import photo from "./unsplash_y3kC_7Qhmjkjohndoe.png";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ModalComment from "../CommentSection/ModalComment";
import { message } from "antd";
import { ErrorDescription } from "@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface";

const success = () => {
  message.success(`Successfully bookmarked`);
};
const error = () => {
  message.error(`Removed from bookmarks`);
};

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
  const [time, setTime] = useState("");
  const [photo, setPhoto] = useState("https://joeschmoe.io/api/v1/random");

  const currentTime = new Date().toISOString();

  useEffect(() => {
    if (currentTime) {
      let d1 = new Date(currentTime).getTime() / 1000;
      let d2 = new Date(props.postData.createdAt).getTime() / 1000;
      var diff = d1 - d2;
      if (diff > 86400) {
        setTime(Math.floor(diff / 86400) + " days ago");
      } else if (diff >= 3600) {
        setTime(Math.floor(diff / 3600) + " hours ago");
      } else if (diff >= 60) {
        setTime(Math.floor(diff / 60) + " minutes ago");
      } else if (diff < 60) {
        setTime(diff + " seconds ago");
      }
    }
    return console.log("done");
  }, []);

  const handleSaved = () => {
    if (saved === false) {
      updateSaved(true);
      success();
    } else if (saved === true) {
      updateSaved(false);
      error();
    }
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
        <div>
          <div id="controls"></div>

          <div>
            <div className="rd-post-header-container">
              <div className="rd-post-profile-pic-wrapper">
                <StyledPhoto src={photo} alt="profilepic" />
              </div>
              <div className="rd-post-header-item-wrapper">
                <div>{props.postData.createdBy}</div>
                <div>{time}</div>
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
          <div>
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
                  label={`${likes} likes`}
                />
              </div>

              <div className="rd-post-reply-to-wrapper">
                <ModalComment refId={props.postData.postId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsSection;
