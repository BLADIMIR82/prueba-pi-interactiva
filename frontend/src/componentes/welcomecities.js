import video from "../imagenes/video1.mp4"

const WelcomeCities = () => {
    return (
      <section
        className="welcomecities"
      
      >
        <video className="video1" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      
      </section>
    );
  };
  
  export default WelcomeCities;
  