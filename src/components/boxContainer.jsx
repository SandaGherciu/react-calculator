import styled from "styled-components";

const BoxContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 16px;
  height: 624px;
  margin-top: 48px;
  color: ${(props) => (props.hasLightTheme ? "#121212" : "#fff")};
  background-color: ${(props) => (props.hasLightTheme ? "#fff" : "#2d2d2d")};
  transition-duration: 0.6s;
`;

export default BoxContainer;
