import styled from 'styled-components';
import * as Animation from "./animations"

export const Container = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 50%;
  animation: ${Animation.Run} 2s linear infinite ;
  /* margin: 0 auto; */
  margin: 10% auto;
`;


