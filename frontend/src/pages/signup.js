import React, { useState } from 'react'
import { connect } from 'react-redux';
import userActions from '.././redux/actions/userActions';
import {Link as LinkRouter } from 'react-router-dom';
import  apiCities from "../componentes/apicities"
import FacebookSignUp from '../componentes/FacebookSignUp';
import { useEffect } from "react";

 function SignUp(props) {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [paises, setPaises] = useState("select...");

  let form = document.getElementById("formIn")

  const handleSubmit = (event) => {
    event.preventDefault()
    const userData={
      firstName:event.target[0].value,
      lastName:event.target[1].value,
      email:event.target[2].value,
      password:event.target[3].value,
      photoURL:event.target[4].value,
      chooseCountry:paises,
      from:"form-Signup"     
  }
  props.signUpUser(userData)
  form.reset()
  
}
 
  function selectPaises(event) {
    setPaises(event.target.value);
  }
  
  return (
    <div className="formsingup">
     
      <div className="container">
      <div>
      <h1>Create your MyTinerary account !!</h1>
      <h1> Select your City of interest: </h1>
            <div>
      <select onChange={selectPaises} className="login__input">
                <option value="Select-City">Select City</option>
                {apiCities.map(cities=>{
                  return(
                    <option  key = {cities.name} value={cities.name}> {cities.name} </option>
                  )
                })}
              </select>
              <div>
      <h2>Already have an account? <LinkRouter className='buttomlink3' to={"/signin"}>Sign In</LinkRouter>.</h2>
      </div>
              </div>
      </div>
      
        <div className="screen">
          <div className="screen__content">
          {paises !== "select..." ? (
            <div className="login">
            <form style={{backgroundImage:"url(" + process.env.PUBLIC_URL+ "./imagenes/imagencalltoaction.jpg)"}}  onSubmit={handleSubmit} id="formIn">
              <div className="login__field">
                <input
                  type="text"
                  className="login__input"
                  placeholder=" You Firts Name"
                />
              </div>
              <div className="login__field">
               
                <input
                  type="text"
                  className="login__input"
                  placeholder=" You Last Name"
                />
              </div>
              <div className="login__field">
              
                <input
                  type="text"
                  className="login__input"
                  placeholder=" You Email"
                />
              </div>
              <div className="login__field">
                
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <div className="login__field">
             
                <input
                  type="text"
                  className="login__input"
                  placeholder=" Select Avatar"
                />
              </div>
              <div className='button1'>
              <button className="button login__submit">
                <span className="button__text"> sign Up</span>
                
              </button>
          <FacebookSignUp   paises={paises} />
            </div>
            </form>
            </div>  ) : (
          
        <h1></h1>
      )

    }
          </div>
          {/* <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
    
}
const mapStateToProps = (state) => {
	return {
		snackbar: state.userReducer.snackbar
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
