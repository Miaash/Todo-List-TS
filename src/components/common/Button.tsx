import styled from 'styled-components';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  style?: {};
  title: string;
  onClick?: any;
  name?: string;
  children?: any;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <Btn
        className={props.className}
        disabled={props.disabled}
        style={props.style}
        name={props.name}
        onClick={props.onClick}
      >
        {props.children}
        {props.title}
      </Btn>
    </>
  );
};

export default Button;

const Btn = styled.button`
  height: 57px;
  font-size: 23px;
  background-color: #15b887;
  border: none;
  border-radius: 10px;
  color: #fff;
  :hover {
    cursor: pointer;
    background-color: #13a478;
  }
`;
