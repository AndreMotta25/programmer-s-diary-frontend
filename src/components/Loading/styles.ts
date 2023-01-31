import styled from 'styled-components';
import * as Animation from "./animations"

export const Container = styled.div`
  width: 5.0rem;
  height:  5.0rem;
  position: relative;
  border-radius: 50%;
  animation: ${Animation.Run} 2s linear infinite ;
  /* margin: 0 auto; */
  margin: 10% auto;
`;


