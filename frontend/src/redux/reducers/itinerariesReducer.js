const initialState = {
    itineraries:[],
    auxiliar:[],
   filterItinerary: [],
   itinerariesByCity:  []

}

const itinerariesReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'fetchItinerary':
            
            return {
                ...state,
                itineraries: action.payload,
                auxiliar: action.payload,
                // filterItinerary: action.payload
                
            }
            
        case 'deleteItinerary':
            return {
                ...state,
                itineraries: action.payload
            }

        case 'cargarItinerary':
            let itineraries = [...state.itineraries]
            itineraries.push(action.payload)
            return{
                ...state,
                itineraries, 
                auxiliar: [...itineraries]
            }

        case 'filtroItinerary':
            const filtrado = action.payload.itineraries.filter((product => product.name.toLowerCase().startsWith(action.payload.value.toLowerCase().trim())))

            return {
                ...state,
                filterItinerary: filtrado
                
            }

            case "fetchearUnaItinerary":
            return{
                ...state,
                itinerariesByCity: action.payload,
            }

        default:
            return state
    }


}
export default itinerariesReducer