import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { passwordAPI, userAuthenticate } from '../../api'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import useHandlerError from '../../hooks/useHandlerError'
import * as S from './styles'
import { useToastContext } from '../../hooks/useToast'
import {forgetPasswordEmailSchema, forgetPasswordTokenSchema} from '../../validations/forgetPasswordSchema'
import ContainerGeneric from '../../components/ContainerGeneric'
import { Helmet } from 'react-helmet'


const ForgetPassword = () => {
  const {errors, handleError} = useHandlerError();  
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);  
  const {toast} = useToastContext();

  const navigate = useNavigate();  

  const handleSubmitSendToken = async () => {
    setLoading((loading) => !loading );
    try {
        await passwordAPI.forgetPassword(formikEmail.values.email);
        setRedirect(true);
    }
    catch(e) {
        handleError(e);
    }
    finally {
        setLoading((loading) => !loading );
    }
  }

  const handleSubmitValidToken = async () => {
    setLoading((loading) => !loading );
    try {
        await userAuthenticate.validateToken(formikToken.values.token);
        navigate(`/reset-senha/${formikToken.values.token}`);
        // vai levar o token que está aqui para a pagina de recuperação. 
    }
    catch{
        toast('Token Invalido', {status:'error',autoCloseIn:1500})
    }
    finally {
        setLoading((loading) => !loading );
    }
  }


  const formikEmail = useFormik({
    initialValues:{email:''},
    onSubmit:handleSubmitSendToken,
    validationSchema:forgetPasswordEmailSchema
  });

  const formikToken = useFormik({
    initialValues:{token:''},
    onSubmit:handleSubmitValidToken,
    validationSchema:forgetPasswordTokenSchema
  })

  useEffect(() =>{
    formikEmail.setErrors({...formikEmail.errors,...errors});
    formikToken.setErrors({...formikToken.errors,...errors});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[errors])

  return (
          <ContainerGeneric>
            <Helmet>
              <title>Diário do Programador - Esqueçeu a senha</title>
              <meta name="description" content="Seu repositorio particular. Diário do Programador. Esqueçeu a senha"/>
              <meta property="og:title" content="Diário do Programador - Home"/>
              <meta property="og:type" content="website"/>
              <meta property="og:image" content=""/>
              <meta property="og:url" content=""/>
              <meta property="og:description" content="Seu repositorio particular. Diário do Programador. Esqueçeu a senha"/>
              <meta name="author" content="Diário do Programador"/>
            </Helmet>
            {!redirect && 
                <form onSubmit={formikEmail.handleSubmit}>
                    <S.Title>Redefinir Senha</S.Title>
                    <S.Message>Insira um email para enviarmos um token de redefinição de senha</S.Message>
                    <Input variant='solid' id='email' name='email' label='Email' value={formikEmail.values.email} onChange={formikEmail.handleChange} error={formikEmail.errors.email}/>
                    {loading && <Loading/>}
                    <S.Button type='submit'>Enviar</S.Button>
            </form>}
            {redirect && 
                <form onSubmit={formikToken.handleSubmit}>
                    <S.Title>Valide o token</S.Title>
                    <S.Message>Enviamos um token para o seu email</S.Message>
                    <Input variant='solid' id='token' name='token' label='Token' value={formikToken.values.token} onChange={formikToken.handleChange} error={formikToken.errors.token}/>
                    {loading && <Loading/>}
                    <S.Button type='submit'>Validar Token</S.Button>
            </form>}
          </ContainerGeneric>
  )
}

export default ForgetPassword