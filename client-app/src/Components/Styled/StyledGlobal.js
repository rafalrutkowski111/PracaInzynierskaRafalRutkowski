import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

const Button = styled(Form.Control)`
    width:100px;
    background-color: white; 
    color: black; 
    border: 1px solid #cccccc;
`
const ButtonWrapper = styled.div`
  &:hover ${Button} {
    background-color: #e6e6e6;
    color: black;
    border: 1px solid #adadad;
  }
`
const ButtonContainer = styled.div`
    widht:100%;
    display: flex;
    justify-content: center;
`
const ButtonWithoutBorder = styled(Form.Control)`
    border:none;
    width:100px;
    background-color: white; 
    color: black; 
`
const ButtonWithoutBorderWrapper = styled.div`
  &:hover ${ButtonWithoutBorder} {
    border:none;
    color: black;
    text-shadow: 1px 1px 10px #000000;
  }
`
const Label = styled(Form.Label)`
    font-weight:400;
    display: flex;
    justify-content: center;
`

export { Button, ButtonWrapper, ButtonContainer };
export { ButtonWithoutBorder, ButtonWithoutBorderWrapper };
export { Label };