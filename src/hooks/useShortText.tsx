import { useState } from "react";

export interface IShortText {
    text:string;
    len: number;
  }
  
const useShortText = ({text,len}: IShortText):[string,() => void] => {
    const [lenght, setLenght] = useState(len);
  
    const handleClick = () => {
      if(text.length > len) 
        if(!(lenght === text.length))
          setLenght(text.length)
        else 
          setLenght(len);  
    }
  
    return [(text.length <= lenght && text) || text.slice(0,lenght) + '...', handleClick]
}

export default useShortText;