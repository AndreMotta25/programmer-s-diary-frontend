import React, { useState } from 'react'
import * as S from './styles'
import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import {Button} from '../Login/styles'
import { useFormik } from 'formik'
import {AxiosError} from 'axios'
import { useToastContext } from '../../hooks/useToast'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import { registerUserSchema } from '../../validations/registerUserSchema'
import { userAPI } from '../../api'


interface IError {
  msg:string;
  param:string;
  value:string;
}
interface IFormError {
  response:{
    data:{
      errors: IError[]
    }
  }
}

const isFormError = (value:unknown): value is IFormError => {
  if(value && value instanceof AxiosError && 'errors' in value.response?.data)
    return true;
  return false;  
}

const Register = () => {
  const { toast } = useToastContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(loading => !loading)
    try{ 
      await userAPI.postUser({
        email:formik.values.email,
        username:formik.values.username,
        password:formik.values.password
      })
      setSuccess(true);
      toast('Usuario criado com sucesso', {status:'success',autoCloseIn:1500})
    }
    catch(e){
      if(isFormError(e)) {
        // Se usarmos classe para resolver isso, vamos ter o dry
         let errors = {} 
         e.response.data.errors.forEach((error) => {
          errors = {...errors, [error.param]: error.msg}
         }) 
         formik.setErrors({...formik.errors, ...errors})
      }
    }
    finally {
      setLoading(loading => !loading)
    }
  }
  
  const formik = useFormik({
    initialValues:{
      email:'',
      username:'',
      password:'',
      same_password:''
    },
    onSubmit: handleSubmit,
    validationSchema:registerUserSchema
  });
  
  return (
    <S.ContainerBackground>
        <S.ContainerRegister>
                <S.Container>
                <S.Header>
                  <S.Img src={logo} alt="Diário do programador" />
                  <S.Title>Crie seu Diário do Programador</S.Title>
                </S.Header>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <Input type='email'    variant='solid' label='Email' onChange={formik.handleChange} value={formik.values.email} id='email' name='email'  error={(formik.touched.email && formik.errors.email) || ''} onBlurFormik={formik.handleBlur}/>
                        <Input type='text'     variant='solid' label='Nome do usuario' onChange={formik.handleChange} value={formik.values.username} id='username' name='username' error={(formik.touched.username && formik.errors.username) || ''} onBlurFormik={formik.handleBlur}/>
                        <Input type='password' variant='solid' label='Senha' onChange={formik.handleChange} value={formik.values.password} id='password' name='password' error={(formik.touched.password && formik.errors.password) || ''} onBlurFormik={formik.handleBlur}/>
                        <Input type='password' variant='solid' label='Repita a senha' onChange={formik.handleChange}  value={formik.values.same_password} id='same_password' name='same_password' error={(formik.touched.same_password && formik.errors.same_password) || ''}/>
                    </div>
                    {loading && <Loading/>}
                    {success && <S.Result>Para entrar confirme seu endereço de email</S.Result>}
                    <Button type='submit'>Cadastrar</Button>  
                </form> 
                <S.GoToLoginPage>
                  <span>ou</span>
                  <Link to="/login">Logar-se</Link>
                </S.GoToLoginPage>
            </S.Container>
            
        </S.ContainerRegister>
    </S.ContainerBackground>
  )
}

export default Register