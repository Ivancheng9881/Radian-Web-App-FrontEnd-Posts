import PostsSection from "../PostsSection/index";

import LevelOneComments from "../CommentSection/LevelOneComments";
import PostComment from "../PostComment/index";

const PostsList = (props) => {
  return (
    <div>
      <PostsSection postData={props.postData.object} />
      {props.postData.object.noOfComments > 0 && (
        <LevelOneComments
          amountOfComments={props.postData.object.noOfComments}
        />
      )}
      <PostComment />
    </div>
  );
};

export default PostsList;
