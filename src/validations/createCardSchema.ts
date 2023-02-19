import * as yup from "yup";

const createCardSchema = yup.object({
  name: yup.string().required("O campo é obrigatorio"),
  description: yup.string().required("O campo é obrigatorio"),
  language: yup.string().required("O campo é obrigatorio"),
});

export {createCardSchema};