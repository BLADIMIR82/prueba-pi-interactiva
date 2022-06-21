import {connect} from "react-redux"
import activitiesActions from "../redux/actions/activitiesAction"
import { useEffect } from "react";

 function CardActivities(props) {


useEffect(()=>{

    props.fetchearUnaActivity(props.id)
},[])

    return (
    
        <div className="activities"> 
         {props.activitiesByItinerary?.map((evento)=> ( 
        <><div>
            <h1>Activities</h1>
          </div>
          <div className="imageactivities">
              
              <div>
              <img className="imagenes" src={evento.imageactivity1} />
                <h5>{evento.tittle1}</h5>   
              </div>
              <div>
                <img className="imagenes" src={evento.imageactivity2} />
                <h5>{evento.tittle2}</h5>
              </div>
              <div>
                <img className="imagenes"  src={evento.imageactivity3} />
                <h5>{evento.tittle3}</h5>
              </div>
             
            </div>
            </>
               ))}
            </div>

                
       
    );
  }

  const mapDispatchToProps  ={
  
    fetchearUnaActivity:activitiesActions.fetchearUnaActivity,
  
  
  }
  const mapStateToProps = (state) =>{
    return{
             
      
      activitiesByItinerary: state.activitiesReducer.activitiesByItinerary
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CardActivities)