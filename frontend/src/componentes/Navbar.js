import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../imagenes/logo3.png"
import icon from "../imagenes/iconlogin.png"
import {Link as LinkRouter} from "react-router-dom"
import { connect } from 'react-redux';
import userActions from "../redux/actions/userActions"


const pages = [
<LinkRouter className='buttomlink1'to="home">Home</LinkRouter>,  
<LinkRouter className='buttomlink1' to="cities">Cities</LinkRouter>
];
const settings = [
<LinkRouter className='buttomlink1'to="signin">SignIn</LinkRouter>,  
 <LinkRouter className='buttomlink1'to="signup">SignUp</LinkRouter>
];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    // SignOut()
    setAnchorElUser(null);
  };

  function SignOut(){
   
    console.log("funcion llamada")
    props.SignOutUser(props.user.email)

  }

  return (
    <AppBar position="fixed" className='navBar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography className='logo'>
           <LinkRouter to="Home"> <img src={logo} alt = "logo" width= {90}  /></LinkRouter>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="error"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button className=' butt'
                key={index}
                onClick={handleCloseNavMenu}
               
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
           
                    <div>

                      <IconButton className="usuario-btn" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar className="usuario-btn" src={props.user? props.user.photoURL:icon} alt="usuario" />
                      </IconButton>
                    </div>
                  
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {props.user ? (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" className='buttomlink1' onClick={SignOut}>SignOut</Typography>
                  </MenuItem>
                 ) : (

                    <div>
                      <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography  textAlign="center"><LinkRouter className='buttomlink1' to={"/signup"}>SignUp</LinkRouter></Typography>
                      </MenuItem>

                      <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography textAlign="center"><LinkRouter className='buttomlink1' to={"/signin"}>SignIn</LinkRouter></Typography>
                      </MenuItem>
                    </div>
                  )
                }

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = {
  SignOutUser: userActions.SignOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);


