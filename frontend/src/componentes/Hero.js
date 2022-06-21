
const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage:
          "url(" + process.env.PUBLIC_URL + "/imagenes/imagenaction.jpg)",
      }}
    >
      <article className="article-hero">
        <div>
          <p> MYtineraries</p>
          <p>
            Find your perfect trip, designed by insiders who know and love
            their cities!
          </p>
        </div>
      </article>
    </section>
  );
};

export default Hero;
