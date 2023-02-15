import React, { useState } from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { userRepository } from "../../repositories/userRepository";

const LoginSchema = yup.object({
  email: yup.string().email("email invalido").required("O Email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading((loading) => !loading);
    // userRepository.post('sessions/')

    setTimeout(() => {
      setLoading((loading) => !loading);
    }, 3000);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: LoginSchema,
  });

  return (
    <>
      <S.ContainerBackground>
        <S.ContainerLogin>
          <S.ContainerElementos>
            <S.Header>
              <S.Img src={logo} alt="Diário do programador" />
              <S.Title>Entre no seu Diário do Programador</S.Title>
            </S.Header>
            <S.Form onSubmit={formik.handleSubmit}>
              <Input
                variant="solid"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlurFormik={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                label="email"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              />
              <Input
                variant="solid"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlurFormik={formik.handleBlur}
                type="password"
                name="password"
                id="password"
                label={"password"}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
              {loading && <Loading />}
              {error && (
                <S.AuthenticationError>
                  Usuario ou senha incorretos
                </S.AuthenticationError>
              )}
              <S.Button type="submit">Fazer Login</S.Button>
            </S.Form>
            <S.Cadastrar>
              <span>ou</span>
              <p>criar uma conta</p>
            </S.Cadastrar>
          </S.ContainerElementos>
        </S.ContainerLogin>
      </S.ContainerBackground>
    </>
  );
};

export default Login;
