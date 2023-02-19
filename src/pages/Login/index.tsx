import React, { useState } from "react";
import * as S from "./styles";
import logo from "../../assets/logo.png";
import { useFormik } from "formik";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { AxiosError } from "axios";
import {useUserContext} from '../../hooks/useUserContext'
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../validations/loginSchema";

interface IAppError {
  response: {
    data:{
      msg: string;
    }
  } 
}

const isAppError = (value:unknown): value is IAppError => {
  if(value && value instanceof AxiosError && 'msg' in value.response?.data)
    return true;
  return false;  
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { sign } = useUserContext();

  const handleSubmit = async () => {
    setLoading((loading) => !loading);
    try {
      await sign({
          identification:formik.values.identification,
          password: formik.values.password
        })
      setError(null)
      navigate('/')  
    }
    catch(e) {
      if(isAppError(e)) {
        setError(e.response.data.msg);
      }
    }
    finally {
      setLoading((loading) => !loading);
    }
  }; 

  const formik = useFormik({
    initialValues: { identification: "", password: "" },
    onSubmit: handleSubmit,
    validationSchema: loginSchema,
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
                value={formik.values.identification}
                onChange={formik.handleChange}
                onBlurFormik={formik.handleBlur}
                type="text"
                name="identification"
                id="identification"
                label="Email ou Username"
                error={
                  formik.touched.identification && formik.errors.identification
                    ? formik.errors.identification
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
                label="Password"
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
              {loading && <Loading />}
              {error && (
                <S.AuthenticationError>
                  {error}
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
