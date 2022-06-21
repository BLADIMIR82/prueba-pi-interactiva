import * as React from 'react';
import {Link as LinkRouter} from "react-router-dom"
import Loader from "../componentes/loader"

export default function Cards(props) {

  return (
    
   <div className='cardsninamics'> 
          <div className='titlecities'>
          <p>Cities</p>
          </div>
          
    {props.cities?.length !== 0?( props.cities?.map(evento=>
        <div className='cardsdinamics1' key={evento._id} >
      
       <LinkRouter  to={`/detalle/${evento._id}`}> <img className="imagenescard" src={process.env.PUBLIC_URL+ `/imagenes/${evento.image}`} /></LinkRouter>
        
          <div className="title-cardcities">
         <LinkRouter className="title-card" to={`/detalle/${evento._id}`}>{evento.name}</LinkRouter>
         </div>

      </div>
      
    )):<Loader />}
    </div>
  )
}
