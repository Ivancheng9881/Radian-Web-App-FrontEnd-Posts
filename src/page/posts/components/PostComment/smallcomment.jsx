import {useState, ChangeEvent, MouseEvent} from 'react'
import styled from 'styled-components';
import photo from '../PostsSection/unsplash_y3kC_7Qhmjkjohndoe.png';
import { SendOutlined } from "@ant-design/icons";



const StyledContainer = styled.div`
    position: relative;
    width: 90%;
    height: 50px;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 5%;
`


const CommentInput = styled.input`
    width: 100%;
    height: 35px;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #F0F0F0;
`

const CommentInputContainer = styled.form`
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
`

const SendButtonContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border: 2px solid black;
`


function SmallComment() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };
    

      const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        console.log('Submit button clicked!');

      };

  return (
    <StyledContainer>
        <CommentInputContainer>
            <CommentInput placeholder="Replying to..." value={inputValue} onChange={handleInputChange}/>
        </CommentInputContainer>
   
    </StyledContainer>
  )
}

export default SmallComment;