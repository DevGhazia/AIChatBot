import React, { useContext, useEffect, useRef } from 'react'
import Response from './Response'
import { PromptContext } from '../context/Context';
import { replace, useLocation, useNavigate, useParams } from 'react-router-dom';

const Conversation = () => {
  const {responses, LoadLogsById, latestMessRef} = useContext(PromptContext);
  const location = useLocation(); 
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    if(location.state?.isFromButton){
      navigate(location.pathname, {replace: true} );
      return;
    }
    LoadLogsById(id);
  }, []);

  return (
      <>
      {responses.map((res, index)=>
        <Response 
          key={res.id}
          question={res.question}
          answer={res.answer}
          isLoading={res.isLoading}
          messRef={(index === responses.length-1)? latestMessRef : null}
        />
      )}
    </>
  )
}

export default Conversation