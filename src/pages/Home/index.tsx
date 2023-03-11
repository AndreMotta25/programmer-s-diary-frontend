import React, { useState, useEffect, useRef } from 'react'
import Menu from '../../components/Menu'
import Header  from '../../components/Header'
import * as S from "./styles";
import CodeMirror from '../../components/CodeMirror';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import { useFormik } from 'formik';
import useShowElement from '../../hooks/useShowElement';
import { createCardSchema } from '../../validations/createCardSchema';
import { ICard } from '../../@types/ICard';
import { LanguageName,langNames } from '@uiw/codemirror-extensions-langs';
import { cardAPI } from '../../api';
import useHandlerError from '../../hooks/useHandlerError';
import { Helmet } from 'react-helmet';

const langs = langNames.sort().map(lang => {
  return {
    value:lang,
    label:lang
  }
})

const Home = () => {
  const modalController = useShowElement();
  const [code, setCode] = useState('');
  const [cards, setCards] = useState<ICard[]>([]); 
  const [cardActive, setCardActive] = useState<ICard | null>(null) 
  const action = useRef('Criar'); 
  const [loading, setLoading] = useState(false)

  const {handleError} = useHandlerError();

  const clearModal = () => {
      formik.setValues({
        name:'',
        description:'',
        language:'',
        id:'',
        code:""
      })
      formik.setTouched({});
      formik.setErrors({})
      modalController.activeElement();
      action.current = 'Criar'
  } 

  const mountCard = async () => {
    const card:ICard = {
      id:formik.values.id || '' ,
      name:formik.values.name,
      description:formik.values.description,
      language:formik.values.language,
      code:formik.values.code || '',
      update_date: new Date()
    }; 

    let cardExists = cards.find(elem => elem.id === card.id) ;
    
    if(cardExists && (card.name !== cardExists.name || card.description !== cardExists.description || card.language !== cardExists.language)){
      card.save = false;
      Object.assign(cardExists, card);
      setCards([...cards]);
      
    }
    else if(!cardExists){
      try{
        const id = await cardAPI.postCard({name:card.name, description:card.description, language:card.language, code:card.code})
        card.id = id;
        setCards([card,...cards]);
      }
      catch(e) {
        handleError(e);
      }
    }
    setCardActive({...card}); 

    setCode(card.code);
    clearModal();
  }

  const updateCard = (card:ICard) => {
    formik.setValues({...card});
    modalController.activeElement();
    action.current = 'Atualizar'
  }

  const deleteInRealTime = (id:string) => {
    if(cardActive?.id === id) 
      setCardActive(null)
    const remainingCards = cards.filter((card) => card.id !== id);
    setCards([...remainingCards])
  }

  // aqui teria que mexer diretamente na api também
  const deleteCard = (id:string) => {
    deleteInRealTime(id);
    try{
      cardAPI.deleteCard(id);
    }
    catch(e){
      handleError(e);
    }
  }

  const formik = useFormik({
    initialValues:{name:'', description:'', language: '', id:'', code:''},
    onSubmit:mountCard,
    validationSchema: createCardSchema
  })

  useEffect(() => {
    if(cardActive){
      cardActive.code = code;
      
      let card = cards.find(card => card.id === cardActive.id);
      
      console.log(card)
      
      if(card && cardActive.code !== card.code){
        card.code = code;
        card.save = false;
        setCards([...cards])
      }
    }
  },[code, cardActive])
  
  useEffect(() => {
    const getCards = async () => {
      setLoading(true) 
      if(cardAPI.hasAuthorization()){
        const cards = await cardAPI.getCards();
        setCards(cards);
        setLoading(false);
      }
    }
    getCards();
  },[])

  return (
    
    <S.ContainerBackground>
        <Helmet>
          <title>Diário do Programador - Home</title>
          <meta name="description" content="Seu repositorio particular. Diário do Programador. Home"/>
          <meta property="og:title" content="Diário do Programador - Home"/>
          <meta property="og:type" content="website"/>
          <meta property="og:image" content=""/>
          <meta property="og:url" content=""/>
          <meta property="og:description" content="Seu repositorio particular. Diário do Programador. Home"/>
          <meta name="author" content="Diário do Programador"/>
        </Helmet>
        <S.ContainerDefault>
          <S.ContainerBlack >
            <Header cards={cards} insertCards={setCards} activeCard={cardActive}/>
            {cardActive && <CodeMirror code={(cardActive && code) || '' } insertCode={setCode} language={cardActive?.language as LanguageName}/>}
            {!cardActive && <S.Warning>Para começar, crie um card!</S.Warning>}
          </S.ContainerBlack>
          <Menu loading={loading} deleteCard={deleteCard} modalController={modalController} cards={cards} updateCard={updateCard} clearModal={clearModal} activeCard={cardActive}/>
          {<Modal controller={modalController}>
            <S.ContainerModal>
              <form onSubmit={formik.handleSubmit}>
                <S.ContainerForm> 
                  <S.ContainerInput>
                    <Input styles={{marginBottom:'5%'}} error={ (formik.touched.name && formik.errors.name)|| '' } id='name' name='name' type='text' variant='solid' value={formik.values.name} label='nome' onChange={formik.handleChange} onBlurFormik={formik.handleBlur}/>
                    <TextArea variant='solid' error={(formik.touched.description && formik.errors.description)|| '' } id='description' name='description' value={formik.values.description} label='descrição' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                  </S.ContainerInput>
                  <S.ContainerInput>
                    <Select options={langs} error={formik.errors.language} value={formik.values.language} onChange={formik.handleChange} id='language' name='language'/>
                  </S.ContainerInput>
                </S.ContainerForm>
                <S.ButtonInherit type="submit">{action.current}</S.ButtonInherit>
              </form>
            </S.ContainerModal>
          </Modal>}
        </S.ContainerDefault>
    </S.ContainerBackground>
  )
}

export default Home