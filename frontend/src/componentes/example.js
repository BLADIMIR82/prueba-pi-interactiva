import React, {useState} from "react"

export default function Counter() {
    const [count, setCount] = useState(0);
    return (
      <>
        {count}
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(prevCount => prevCount - 1)}>dislike</button>
        <button onClick={() => setCount(prevCount => prevCount + 1)}>like</button>
      </>
    );
  }

  import  NoItineraries from "./noitineraries"
  import  itinerariesActions from "../redux/actions/itinerariesAction"
  import {connect} from "react-redux"

  <>
  {props.itinerariesByCity?.length !== 0?(props.itinerariesByCity?.map(evento=> ( 
    <RecipeReviewCard id={evento.id}/>
  ))):( <NoItineraries />)}

  </> 

  useEffect(()=>{
    props.fetchearUnaItinerary(props.id)
    
  },[])

  const mapDispatchToProps  ={
  
    fetchearUnaItinerary:itinerariesActions.fetchearUnaItinerary,
  
       
  
  }
  
  const mapStateToProps = (state) =>{
    return{
             
        itineraries:state.itinerariesReducer.itineraries,
        itinerariesByCity:state.itinerariesReducer.itinerariesByCity
    }
  }

  