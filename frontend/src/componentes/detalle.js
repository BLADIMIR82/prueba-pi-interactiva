import * as React from 'react';
import {useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import RecipeReviewCard from "./itinirariesdos"
import {connect} from "react-redux";
import citiesActions from "../redux/actions/citiesAction";

function CardsDetalle(props) {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

    const {id} = useParams()
    const [card, setCard] = useState({element:props.cities.find((i)=>i._id.toString()===id.toString())})
  
  useEffect(()=>{
    if (props.cities.length < 1){

      props.fetchearUnaCiudad(id)
      .then((traerId)=>setCard({element:traerId}))
    }

  },[])

    if (!card.element){
      return (props.cities)
    }

 

   
  return (
    
    <div className= "cardsDetalle">
   
<div className="cards">
<div className="card">
  <h2 className="card-title">{card.element.name}</h2>
  <img src={process.env.PUBLIC_URL+ `/imagenes/${card.element.image}`} />
  <p className="card-desc">{card.element.info}</p>
</div>
</div>
    
       
    
    <div>

<RecipeReviewCard id={id} />
     
    </div>
  <div></div>

    </div>
  )
}
const mapDispatchToProps  ={ //trae el metodo de los actions
  fetchearCities:citiesActions.fetchearCities,
  // fetchearItinerary:itinerariesActions.fetchearItinerary,
  filtrarCities:citiesActions. filtrarCities,
  fetchearUnaCiudad: citiesActions.fetchearUnaCiudad

}

const mapStateToProps = (state) =>{  //trae los estados declarados en los reducers
  return{
      cities:state.citiesReducer.cities,
      auxiliar: state.citiesReducer.auxiliar,
      filterCities:state.citiesReducer.filterCities,
      itineraries:state.itinerariesReducer.itineraries
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsDetalle)


 