
const initialState = {
    cities:[],
    auxiliar:[],
   filterCities: [], 
}

const citiesReducer = (state = initialState, action)=>{

    switch(action.type){
        case 'fetch':
            
            return {
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
                filterCities: action.payload
                
            }
            
        case 'delete':
            return {
                ...state,
                cities: action.payload
            }

        case 'cargarProducto':
            let cities = [...state.cities]
            cities.push(action.payload)
            return{
                ...state,
                cities, 
                auxiliar: [...cities]
            }

        case 'filtro':
            const filtrado = action.payload.cities.filter((product => product.name.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())))

            return {
                ...state,
                filterCities: filtrado
                
            }
        default:
            return state
    }


}
export default citiesReducer


// Los reducers especifican cómo
// cambia el estado de la aplicación en respuesta a las acciones enviadas al store. Recuerda que
// las acciones solo describen el hecho de que sucedió algo, pero no describen de qué manera
// cambia el estado de la aplicación. Estos reciben dos parámetros: la acción y el estado que
// tenía anteriormente. Con ellos, se podrá modificar el estado y lo devolverá con la nueva
// situación.