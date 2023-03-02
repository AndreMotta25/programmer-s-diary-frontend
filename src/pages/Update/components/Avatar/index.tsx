import { isAxiosError } from 'axios'
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { userAPI } from '../../../../api'
import useHandlerError from '../../../../hooks/useHandlerError'
import { useToastContext } from '../../../../hooks/useToast'
import { useUserContext } from '../../../../hooks/useUserContext'
import { ContainerUpdate } from '../../styles'
import * as S from './styles'


const Avatar = () => {
  const refImage = useRef<HTMLImageElement | null>(null)   
  const {user,loading} = useUserContext()  
  const {handleError} = useHandlerError();
  const {toast} = useToastContext();
  
  console.log(user)
     
  const preview = (file:File) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
        refImage.current?.setAttribute('src', `${fileReader.result}`);
    }
    fileReader.readAsDataURL(file)
  }

  const upload = async (file:File) => {
    try{
       await userAPI.uploadPhoto(file);
       toast('Upload feito com sucesso',{status:'success',autoCloseIn:1000})
    }
    catch(e){
      handleError(e)
    }
  }

  const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    if(target.files){
        const image = target.files[0];
        preview(image);
        upload(image);
    }

  }

  return (
    <ContainerUpdate>
        {loading && <p>Carregando</p>}
        {!loading &&
        <form>
            <S.InputPhoto type='file' id='avatar' onChange={handleChange} accept='.jpeg,.png,.jpg' />
            <S.PhotoButton htmlFor='avatar'>
                <img ref={refImage} src={`http://localhost:3333/avatar/${user?.avatar}`} alt='foto'/>
                <AiOutlineUpload className='upload-photo' size="60%"/>
            </S.PhotoButton>
        </form>
        }
    </ContainerUpdate>
  )
}

export default Avatar