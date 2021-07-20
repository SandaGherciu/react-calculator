import styled from "styled-components";

const Button = styled.button`
  font-size: 20px;
  border: none;
  width: 72px;
  height: 72px;
  padding: 0;
  color: ${(props) => (props.hasLightTheme ? "#121212" : "#fff")};
  background-color: ${(props) => (props.hasLightTheme ? "#f3f3f3" : "#1c1c1c")};
  transition-duration: 0.6s;
`;

export default Button;
