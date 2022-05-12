import {useState, ChangeEvent, MouseEvent} from 'react'
import styled from 'styled-components';
import photo from '../PostsSection/unsplash_y3kC_7Qhmjkjohndoe.png';
import { SendOutlined } from "@ant-design/icons";



const StyledContainer = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`

const ImageDiv = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
`

const CommentInput = styled.input`
    width: 100%;
    height: 35px;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`

const CommentInputContainer = styled.form`
    position: relative;
    width: 100%;
    height: 50px;
    padding-left: 10px;
    padding-top: 5px;
    display: flex;
`

const SendButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid black;
`


function PostComment() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };
    

      const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        console.log('Submit button clicked!');

      };

  return (
    <StyledContainer>
        <ImageDiv>
            <img src={photo} alt="profilepic" />
        </ImageDiv>
        <CommentInputContainer>
            <CommentInput value={inputValue} onChange={handleInputChange}/>
            <button onClick={handleClick}>Submit</button>
        </CommentInputContainer>
   
    </StyledContainer>
  )
}

export default PostComment