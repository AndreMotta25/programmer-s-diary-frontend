import styled from 'styled-components';

export const Container = styled.div`
  
`;
export const InputPhoto = styled.input`
   display: none;
`

export const PhotoButton = styled.label`
    border-radius: 50%;
    border: 2px solid #282828;
    width: 7.6rem;
    height: 7.6rem;
    display: flex;
    cursor: pointer;
    margin: 0 auto;
    position: relative;
    align-items: center;


    & img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
  }
  &:hover .upload-photo {
    width: 100%;
    position: absolute;
    color: #fff;
    transition: color 0.3s ease;
  }
  &::before {
      content: '';
      display: block;
      width: 7.6rem;
      height: 7.6rem;
      background-color: rgba(0,0,0,50%);
      position: absolute;
      top: -2px;
      left: -2px;
      border-radius: 50%;
    }
`

export const Message = styled.p`
    font-size: 1.8rem;
    margin: 2rem auto;
    font-weight: bold;
    text-align: center;

`