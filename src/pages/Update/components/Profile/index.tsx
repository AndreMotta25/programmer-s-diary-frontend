import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { userAPI } from '../../../../api';
import Input from '../../../../components/Input';
import { useToastContext } from '../../../../hooks/useToast';
import { useUserContext } from '../../../../hooks/useUserContext';
import { Button, ContainerUpdate } from '../../styles';
import useHandlerError from '../../../../hooks/useHandlerError';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const {user,valid} = useUserContext();
  const {toast} = useToastContext();
  const {errors, handleError} = useHandlerError();

  const handleSubmit = async () => {
    try {
      await userAPI.putProfileUser({
        email:formik.values.email,
        username: formik.values.username
      })
      toast('Atualizado com sucesso',{status:'success'})
    }
    catch(e){
      handleError(e);
    }
  }

  const formik = useFormik({
    initialValues: {
        email:'',
        username:''
    },
    onSubmit:handleSubmit
  })
  
  useEffect(() => {
    formik.setErrors({...formik.errors, ...errors})
  },[errors])

  // isso é para evitar de fazer um get na api
  useEffect(() => {
    const getUser = async () => {
      const isValid = await valid();
      
      if(isValid && userAPI.hasAuthorization()){
        const userResult = await userAPI.getUser();
        formik.setValues({
          email: userResult.email,
          username: userResult.username
        })  
      }
    }
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return (
    <>
      <Helmet>
        <title>Diário do Programador - Perfil</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <ContainerUpdate>
          <Input type='email' variant='solid' label='Email' value={formik.values.email} name='email' id='email' onChange={formik.handleChange} error={(formik.touched.email && formik.errors.email) || ''} />
          <Input type='text' variant='solid' label='Username' value={formik.values.username} name='username' id='username' onChange={formik.handleChange} error={(formik.touched.username && formik.errors.username) || ''}/>
        </ContainerUpdate>
        <Button type='submit'>Atualizar usuario</Button>
      </form>
    </>
  )
}

export default React.memo(Profile)