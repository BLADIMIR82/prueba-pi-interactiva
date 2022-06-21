import React, {useEffect} from "react";
import Carrousel from "../componentes/Carrousel"
import Hero from "../componentes/Hero";
import CalltoAction  from "../componentes/calltoaction"

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
     <div>
      <Hero />

      <CalltoAction  />

      <Carrousel />
      
          
       </div>
   
  );
}

export default Home;