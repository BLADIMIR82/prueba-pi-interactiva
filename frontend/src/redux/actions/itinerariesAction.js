import axios from 'axios';

const itinerariesActions = {
    
    fetchearItinerary: () =>{
      
       return async(dispatch, getState) => {
            const res = await axios.get('https://mytinerari-rojas.herokuapp.com/api/allitineraries')
            dispatch({type:'fetchItinerary', payload:res.data.response.itineraries})
       }
    },
    
    fetchearUnaItinerary: (id) =>{
       
        return async (dispatch, getState) => {
            const res = await axios.get("https://mytinerari-rojas.herokuapp.com/api/allitineraries/"+id)
         
            dispatch({type:'fetchearUnaItinerary', payload:res.data.response.itinerary})
          
        }
    },
    likeDislike: (id) => {
        console.log(id)
        const token = localStorage.getItem('token')
        return async () => {
            try {
                let response = await axios.put(`https://mytinerari-rojas.herokuapp.com/api/likeDislike/${id}`, {},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                console.log(response) 
                return response
                
            }catch (error) {
                console.log(error)
            }
        }
    }





}

export default itinerariesActions;