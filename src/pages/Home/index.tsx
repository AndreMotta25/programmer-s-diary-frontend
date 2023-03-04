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
import {v4} from 'uuid'
import { createCardSchema } from '../../validations/createCardSchema';
import { ICard } from '../../@types/ICard';
import { LanguageName,langNames } from '@uiw/codemirror-extensions-langs';


const langs = langNames.sort().map(lang => {
  return {
    value:lang,
    label:lang
  }
})

const Home = () => {
  const modalController = useShowElement();
  const [code, setCode] = useState('');
  const [search, setSearch] = useState('');
  
  const [cards, setCards] = useState<ICard[]>([{id:'1',name:'black',  update_date:new Date('03/02/2023'),description:'is simply dummy text of the printing and typesetting industry.',language:'javascript', code:'console.log()'},
                                               {id:'2',name:'sabbath',update_date:new Date('03/01/2023'),description:'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',language:'javascript', code:'console.log()'},
                                               {id:'3',name:'ozzy',   update_date:new Date('03/03/2023'), description:'teste3',language:'javascript', code:'console.log()'},
                                               {id:'4',name:'pearl jam', update_date:new Date('02/21/2023'),description:'teste4',language:'css', code:'p{}'},
                                               {id:'5',name:'nirvana',update_date:new Date('02/22/2023') ,description:'teste5',language:'css', code:'p{}'},
                                               {id:'6',name:'acdc',update_date:new Date('02/03/2023') ,description:'teste6',language:'css', code:'p{}'}]);

  const [cardActive, setCardActive] = useState<ICard | null>(null) 
  const action = useRef('Criar'); 

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

  const mountCard = () => {
    const card:ICard = {
      id:formik.values.id || v4() ,
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
      // aqui o novo id seria atribuido
      card.save = false;
      setCards([card,...cards]);
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
  
  return (
    
    <S.ContainerBackground>
        <S.ContainerDefault>
          <S.ContainerBlack >
            <Header cards={cards} insertCards={setCards} activeCard={cardActive}/>
            {cardActive && <CodeMirror code={(cardActive && code) || '' } insertCode={setCode} language={cardActive?.language as LanguageName}/>}
            {!cardActive && <S.Warning>Para começar, crie um card!</S.Warning>}
          </S.ContainerBlack>
          <Menu deleteCard={deleteCard} research={setSearch} search={search} modalController={modalController} cards={cards} updateCard={updateCard} clearModal={clearModal} activeCard={cardActive}/>
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