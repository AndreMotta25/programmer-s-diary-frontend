import * as yup from 'yup';

const registerUserSchema = yup.object({
    email: yup.string().email('Insira um email valido').required('O campo é obrigatorio'),
    username:yup.string().required('O campo é obrigatorio').min(5,'O username deve ter no minimo 5 caracteres').trim('Retire os espaços desnecessários').strict(true),
    password: yup.string().required('O campo é obrigatorio').trim('Retire os espaços da senha').strict(true)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    'A senha precisa ter no mínimo 8 caracteres,' +
    'uma letra maiúscula e uma letra minúscula, ' +
    'um número e um caracter especial' ),
    same_password:yup.string().required('O campo é obrigatorio').oneOf([yup.ref('password')],'As senhas não combinam')
  })

export {registerUserSchema};