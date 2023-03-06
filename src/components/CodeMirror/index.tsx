import { useCodeMirror } from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react'
import { dracula } from '@uiw/codemirror-theme-dracula';
import { loadLanguage, LanguageName } from '@uiw/codemirror-extensions-langs';
import * as S from "./styles"
import React from 'react';



interface IProps {
    code: string;
    insertCode:  React.Dispatch<React.SetStateAction<string>>
    language: LanguageName;
}
const CodeMirror = ({code, insertCode,language}:IProps) => {
    const container = useRef<HTMLDivElement>(null);
     
    const onChange = React.useCallback((value: string)=> {
        insertCode(value)
    },[insertCode])

    
    const {setContainer} = useCodeMirror(
    {
        container: container.current,
        theme:dracula,
        extensions:[loadLanguage(language || 'javascript')!],
        height: '100%',
        value:code,
        placeholder:"Digite seu codigo aqui",
        onChange:onChange,
        basicSetup: {
            autocompletion:true
        },
    })
     
  useEffect(() => {
    if(container.current) {
        setContainer(container.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[container.current])

  return (
    <S.Container ref={container}></S.Container>
  )
}

export default CodeMirror