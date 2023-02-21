import axios, { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import * as S from "./styles"

const ConfirmEmail = () => {
  const [ error, setError] = useState(null);  
  const { token } = useParams();
  const [loading, setLoading] = useState(true)  

  useEffect(() => {
    const confirmEmail = async () => {
        try {
            await axios.patch(`http://localhost:3333/confirm-email/${token}`);
        }
        catch(e){
            if(isAxiosError(e))
                setError(e.response?.data.msg);
        }
        finally {
            setLoading(false);
        }
    }
    confirmEmail();

  },[token])

  return (
    <S.Container>
        <S.MessageBox>
            <S.Message>
                {loading && <Loading/>}
                {!loading && !error && 'Email Confirmado' }
                {!loading && error && error}
            </S.Message>
        </S.MessageBox>
    </S.Container>
  )
}

export default ConfirmEmail