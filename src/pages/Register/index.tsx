import React, { useState } from 'react'
import * as S from './styles'
import logo from '../../assets/logo.png'
import Input from '../../components/Input'
import {Button} from '../Login/styles'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { userRepository } from '../../repositories/userRepository'
import {AxiosError} from 'axios'
import { useToastContext } from '../../hooks/useToast'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'

// todo: colocar isso numa pasta de validaçoes
const schemaRegisterUser = yup.object({
  email: yup.string().email('Insira um email valido').required('O campo é obrigatorio'),
  username:yup.string().required('O campo é obrigatorio').min(5,'O username deve ter no minimo 5 caracteres').trim('Retire os espaços desnecessários').strict(true),
  password: yup.string().required('O campo é obrigatorio').trim('Retire os espaços da senha').strict(true)
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
  'A senha precisa ter no mínimo 8 caracteres,' +
  'uma letra maiúscula e uma letra minúscula, ' +
  'um número e um caracter especial' ),
  same_password:yup.string().required('O campo é obrigatorio').oneOf([yup.ref('password')],'As senhas não combinam')
})

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

  const handleSubmit = async () => {
    setLoading(loading => !loading)
    try{ 
      await userRepository.post('user',{
        email:formik.values.email,
        username:formik.values.username,
        password:formik.values.password
      })
      toast('Usuario criado com sucesso', {status:'success'})
    }
    catch(e){
      if(isFormError(e)) {
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
      email:'relaie22@gmail.com',
      username:'relaie22',
      password:'Desenhos1@',
      same_password:'Desenhos1@'
    },
    onSubmit: handleSubmit,
    validationSchema:schemaRegisterUser
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