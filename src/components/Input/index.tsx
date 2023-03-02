import React , { ChangeEvent, InputHTMLAttributes, useState , useRef, useEffect} from 'react'
import * as S from "./styles"
import {MdErrorOutline} from 'react-icons/md'


interface IStyles {
  width?: string;
  marginBottom?: string;
}

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  variant: "solid" | "standard";
  error?: string;
  label: string;
  value: string;
  styles?: IStyles;
  onBlurFormik?: (e: ChangeEvent<Element>) => void;
}

const Input = (({variant, label, value , error, id, onBlurFormik, styles, ...rest}:IProps) => {
 
  const [focusInput, setFocusInput] = useState(false);
  const input = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if(value !== '')
      setFocusInput(true)
  },[value])

  const handleFocus = () => {
    setFocusInput(true);
    if(input.current){
       input.current.select();
    }
  }
  
  const handleBlur = (e:ChangeEvent<Element>) => { 
    if(typeof onBlurFormik === "function") onBlurFormik(e);
    if(value === ""){
      setFocusInput(false);
    }
  }

  return (
    <S.Container width={styles?.width} marginBottom={styles?.marginBottom}>
        <S.InputElement ref={input} onFocus={handleFocus} onBlur={handleBlur} autoComplete='off'  
            value={value}
            focus={focusInput}
            variant={variant}
            id={id}
            error={error}
            {...rest}
        />

        <S.Label id={id} onClick={handleFocus} variant={variant}>{label}</S.Label> 
        {error && 
        <S.ContainerError>
            <S.Error>{error}</S.Error>
            <MdErrorOutline/>
        </S.ContainerError> }
        
    </S.Container>
  )
})

export default Input;