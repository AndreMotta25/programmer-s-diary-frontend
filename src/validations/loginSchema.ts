import * as yup from 'yup'

const loginSchema = yup.object({
    identification: yup.string().required("A identificação é obrigatória"),
    password: yup.string().required("A senha é obrigatória"),
});

export {loginSchema}