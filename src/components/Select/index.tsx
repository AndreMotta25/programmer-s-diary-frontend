import React, {SelectHTMLAttributes} from 'react'
import { MdErrorOutline } from 'react-icons/md';
import * as S from "./styles"

interface ITypeOptions {
    value: string;
    label: string;
}

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement>{
    options: ITypeOptions[];
    error?:string;
}


const Select = ({options, value, error, ...props}: ISelect) => {
  return (
    <S.Container>
        <S.Select value={value} {...props} error={error}>
            <option value={''} disabled>Escolha uma linguagem</option>
            {options.map((option) => (
                <option key={option.label} value={option.value}>{option.label}</option>
            ))}
        </S.Select>
        {error && 
            <S.ContainerError>
                <S.Error>{error}</S.Error>
                <MdErrorOutline/>
            </S.ContainerError> }
    </S.Container>
  )
}

export default Select