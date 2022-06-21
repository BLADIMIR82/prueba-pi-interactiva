import axios from 'axios';

const activitiesActions = {
    
    fetchearActivity: () =>{
      
       return async(dispatch, getState) => {
            const res = await axios.get('https://mytinerari-rojas.herokuapp.com/api/allactivities')
            dispatch({type:'fetchActivities', payload:res.data.response.activities})
       }
    },
   
    fetchearUnaActivity: (id) =>{
        return async (dispatch, getState) => {
            const res = await axios.get("https://mytinerari-rojas.herokuapp.com/api/allactivities/"+id)
             dispatch({type:'fetchearUnaActivity', payload:res.data.response.activities})
          
        }
    },

    filterActivityforItinerary: (id) => {

      return async (dispatch, getState) => {
        const res = await axios.get('https://mytinerari-rojas.herokuapp.com/api/allactivities/itinerary/${id}')
        dispatch({ type: "filterActivitiesForItinerary", payload: res.data.respuesta })
      }
    },

  
   





}

export default activitiesActions;