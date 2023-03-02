import * as yup from 'yup';

const forgetPasswordEmailSchema =  yup.object({
    email:yup.string().email("Insira um email valido").required('O campo é obrigatorio')
})

const forgetPasswordTokenSchema =  yup.object({
    token:yup.string().required('O campo é obrigatorio')
})

export {forgetPasswordEmailSchema,forgetPasswordTokenSchema}