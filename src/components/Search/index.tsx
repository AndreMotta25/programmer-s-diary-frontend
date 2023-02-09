import React,{InputHTMLAttributes} from 'react'
import Input from '../Input'
import *  as S from "./styles" 

interface ISearch extends InputHTMLAttributes<HTMLInputElement>{
    value: string;
}

const Search = ({value, ...props}: ISearch) => {
  return (
    <div>
        <Input type="search" variant='solid' label='Search' id="search" value={value}  {...props}/>
    </div>
  )
}

export default Search