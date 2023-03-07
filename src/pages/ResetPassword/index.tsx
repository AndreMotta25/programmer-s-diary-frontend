import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ContainerGeneric from '../../components/ContainerGeneric'
import Input from '../../components/Input';
import { Button } from '../Login/styles';
import {passwordAPI} from '../../api/'
import useHandlerError from '../../hooks/useHandlerError';
import { resetPasswordSchema } from '../../validations/resetPasswordSchema';
import { useToastContext } from '../../hooks/useToast';
import { Helmet } from 'react-helmet';

const ResetPassword = () => {
  
  const navigate = useNavigate();

  const {errors,handleError} = useHandlerError();
  const {token} = useParams();
  const {toast} = useToastContext();  

  const handleSubmit = async () => {
    if(token) {
        try{
            await passwordAPI.resetPassword({token:token, new_password:formik.values.password});
            toast('Senha Atualizada',{status:'success',autoCloseIn:2000});
            setTimeout(() => {
                navigate('/login')
            },2000);
            
        }
        catch(e) {
            handleError(e);
        }
    }
  } 
  
  const formik = useFormik({
    initialValues: {
        password:'',
        same_password:''
    },
    onSubmit:handleSubmit,
    validationSchema:resetPasswordSchema
  });

  useEffect(() => {
    if(!token) {
        navigate('/login');
    }
  },[token]) 

  useEffect(() => {
    formik.setErrors({...formik.errors,...errors })
  },[errors])

  return (
    <ContainerGeneric>
        <Helmet>
              <title>Diário do Programador - Resetar Senha</title>
              <meta name="description" content="Seu repositorio particular. Diário do Programador. Resetar a Senha"/>
              <meta property="og:title" content="Diário do Programador - Resetar Senha"/>
              <meta property="og:type" content="website"/>
              <meta property="og:image" content=""/>
              <meta property="og:url" content=""/>
              <meta property="og:description" content="Seu repositorio particular. Diário do Programador.  Resetar Senha"/>
              <meta name="author" content="Diário do Programador"/>
            </Helmet>
        <form onSubmit={formik.handleSubmit}>
            <Input onBlurFormik={formik.handleBlur} type='password' onChange={formik.handleChange} value={formik.values.password} label='Senha' id='password' name='password' variant='solid' error={(formik.touched.password && formik.errors.password) || ''}/>
            <Input onBlurFormik={formik.handleBlur} type='password' onChange={formik.handleChange} value={formik.values.same_password} label='Repita a senha' id='same_password' name='same_password'error={(formik.touched.same_password && formik.errors.same_password) || ''} variant='solid'/>
            <Button type='submit'>Resetar Senha</Button>
        </form>
    </ContainerGeneric>
    
  )
}

export default ResetPassword;