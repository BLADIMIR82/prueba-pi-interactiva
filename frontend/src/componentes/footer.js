import React from "react"
import {Link as LinkRouter} from "react-router-dom"
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBRipple
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#caced1" }}
    >
      <MDBContainer className="p-4">
        <section className="">
          <div className="pb-3 col-example">
            {" "}
            <a
              className="btn btn-outline-dark btn-floating m-1"
              href="#!"
              role="button"
            >
               <LinkRouter className='buttomlink2' to="home">Home</LinkRouter>
            </a>
            <a
              className="btn btn-outline-dark btn-floating m-1"
              href="#!"
              role="button"
            >
              <LinkRouter className='buttomlink2' to="cities"> Cities </LinkRouter>
            </a>
          </div>
          <MDBRow>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              >
                <LinkRouter to="cities">  
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp"
                  className="w-100"
                  />
                  </LinkRouter>
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              >
                <LinkRouter to="cities">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/111.webp"
                  className="w-100"
                />
                </LinkRouter>
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              > <LinkRouter to="cities">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/112.webp"
                  className="w-100"
                />
                </LinkRouter>
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              >
                <LinkRouter to="cities">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/114.webp"
                  className="w-100"
                />
                </LinkRouter>
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              > 
              <LinkRouter to="cities">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/115.webp"
                  className="w-100"
                />
                </LinkRouter>  
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  ></div>
                </a>
              </MDBRipple>
            </MDBCol>
            <MDBCol lg="2" md="12" className="mb-4 mb-md-0">
              <MDBRipple
                rippleColor="light"
                className="bg-image hover-overlay shadow-1-strong rounded"
              > <LinkRouter to="cities">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/fluid/city/116.webp"
                  className="w-100"
                  
                />
                </LinkRouter>
               
                <a href="#!">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  >
                  </div>
                </a>
              </MDBRipple>
            </MDBCol>
          </MDBRow>
                <div className="iconsocial">
              <a href="https://www.facebook.com/"><img src="../imagenes/logofacebook.png" alt="img"  className="iconsocials" /></a>
               <a href="https://www.instagram.com/accounts/login/?hl=es&sour..."> <img src="../imagenes/instagram.png" alt="img"  className="iconsocials" /> </a>
                <a href= "https://www.youtube.com/"> <img src="../imagenes/youtube.png" alt="img"  className="iconsocials" /></a>
                <a href="https://mobile.twitter.com/i/flow/login"><img src="../imagenes/twitter.png" alt="img"  className="iconsocials" /> </a>
                </div>
        </section>
      </MDBContainer>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <p className="text-black pt-3">
          {" "}
          © 2022 Copyright | Bladimir Rojas | MindHub
        </p>
      </div>
    </MDBFooter>
  );
}
