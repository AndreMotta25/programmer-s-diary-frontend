import * as yup from 'yup'

const updatePasswordSchema = yup.object({
    password: yup.string().required('O campo é obrigatorio').trim('Retire os espaços da senha').strict(true)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    'A senha precisa ter no mínimo 8 caracteres,' +
    'uma letra maiúscula e uma letra minúscula, ' +
    'um número e um caracter especial' ),
    same_password:yup.string().required('O campo é obrigatorio').oneOf([yup.ref('password')],'As senhas não combinam')
})

export {updatePasswordSchema};