import axios from 'axios';

const citiesActions = {
    
    fetchearCities: () =>{
       return async(dispatch, getState) => {
            const res = await axios.get('https://mytinerari-rojas.herokuapp.com/api/allcities')
            dispatch({type:'fetch', payload:res.data.response.ciudades})
       }
    },
    
    fetchearUnaCiudad: (id) =>{
        return async (dispatch, getState) => {
            try {

                const respuesta = await axios.get("https://mytinerari-rojas.herokuapp.com/api/allcities/"+id)
             
                return(respuesta.data.response)

            }catch(err){
                console.log(err)
            }
        }
    },   
   
    filtrarCities: (cities, value)=>{
       
        return (dispatch,getState)=>{
            dispatch({type:'filtro', payload:{cities, value}})
        }
    },
    cargarCities: (name,cities)=>{
        return async(dispatch,getState)=>{
            const respuesta = await axios.post('https://mytinerari-rojas.herokuapp.com/api/allcities',{name,cities})
            dispatch({type:'cargarCity', payload:respuesta.data.respuesta})

        }
    }





}

export default citiesActions;
     