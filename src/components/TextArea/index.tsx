import React , { ChangeEvent, useState , useRef, TextareaHTMLAttributes, useEffect} from 'react'
import * as S from "./styles"
import {MdErrorOutline} from 'react-icons/md'


interface IStyles {
  width?: string;
  marginBottom?: string;
}

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  variant: "solid" | "standard";
  error?: string;
  label: string;
  value: string;
  styles?: IStyles;
  onBlur?: (e: ChangeEvent<Element>) => void;
}

const TextArea = (({variant, label, value , error, id, onBlur, styles, ...rest}:IProps) => {
 
  const [focus, setFocus] = useState(false);
  const textArea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(value !== '')
      setFocus(true)
  },[value])
  
  // posso exportar
  const handleFocus = () => {
    setFocus(true);
    if(textArea.current){
       textArea.current.select();
    }
  }
  
  // posso exportar
  const handleBlur = (e:ChangeEvent<Element>) => { 
    if(typeof onBlur === "function") onBlur(e);
    if(value === ""){
      setFocus(false);
    }
  }

  return (
    <S.Container width={styles?.width} marginBottom={styles?.marginBottom}>
        <S.TextAreaElement ref={textArea} onFocus={handleFocus} onBlur={handleBlur} autoComplete='off'  
            value={value}
            focus={focus}
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

export default React.memo(TextArea);