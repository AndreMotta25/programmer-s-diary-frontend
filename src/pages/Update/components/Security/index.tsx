import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { userAPI } from '../../../../api';
import Input from '../../../../components/Input';
import useHandlerError from '../../../../hooks/useHandlerError';
import { useToastContext } from '../../../../hooks/useToast';
import { Button, ContainerUpdate } from '../../styles';
import {updatePasswordSchema} from '../../../../validations/updatePasswordSchema'

const Security = () => {
  const {handleError,errors} = useHandlerError();
  const {toast} = useToastContext();

  const handleSubmit = async () => {
    try {
      await userAPI.patchPassword(formik.values.password);
      toast("Senha atualizada com sucesso",{status:'success', autoCloseIn:1500})
    }
    catch(e) {
      handleError(e);
    }
  }

  useEffect(() => {
    formik.setErrors({...formik.errors, ...errors});
  },[errors])

  const formik = useFormik({
    initialValues: {
        password:'',
        same_password:''
    },
    onSubmit:handleSubmit,
    validationSchema:updatePasswordSchema
  })
  
  return (
    <> 
    <form onSubmit={formik.handleSubmit}>
       <ContainerUpdate>
         <Input type='password' id='password' name='password' variant='solid' label='Senha' value={formik.values.password} onChange={formik.handleChange} error={(formik.touched.password && formik.errors.password) || ''}/>
         <Input type='password' id='same_password' name='same_password' variant='solid' label='Repita a Senha' value={formik.values.same_password} onChange={formik.handleChange} error={(formik.touched.same_password && formik.errors.same_password) || ''}/>
       </ContainerUpdate>
       <Button type='submit'>Atualizar senha</Button>
    </form>
     </>
  )
}

export default Security