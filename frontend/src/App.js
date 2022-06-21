import "./App.css";
import ResponsiveAppBar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import CardsDetalle from "./componentes/detalle";
import Cities from "./pages/cities";
import PruebaApi from "./componentes/Frommyapi";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Alert from "./componentes/Snackbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';


function App(props) {
  useEffect(() => {
 
    if(localStorage.getItem('token')!== null){
      const token = localStorage.getItem("token")
      props.VerificarToken(token)
    }
  },[])
  
  return (
    <div className="App">
      <Alert />
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="detalle/:id" element={<CardsDetalle />} />
          <Route path="pruebaApi/" element={<PruebaApi />} />
          {!props.user&&<Route path="/signin" element={<SignIn />} />}
          {!props.user&&<Route path="/signup" element={<SignUp />} />}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = {
	VerificarToken: userActions.VerificarToken,

}
const mapStateToProps = (state) =>{
  return{
           
      user:state.userReducer.user,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

