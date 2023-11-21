import React from 'react';
import { Button,Container,Nav,Navbar as NavbarBs} from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from '../context/ShoppingCartContext.js';
import makeStyles  from './Navbar_styles.js';
import { summarybuttonStyle } from './Store_styles.js';
import '../Minigame/Minigame.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const Navbar = () =>
{
    const classes = makeStyles();
    const { openCart, cartQuantity } = useShoppingCart()
    
    const navigate = useNavigate();

    const handleLogout = async () => 
    {
      try 
      {
        // Make a POST request to the logout endpoint
        const response = await fetch('http://localhost:4000/api/user/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  
        // Check if logout was successful
        if (response.ok) 
        {
          localStorage.removeItem('access_token');  // Clear user data from local storage
          navigate('/');                            // Redirect to the homepage
        } 
        else 
        {
          console.error('Logout failed:', response.statusText);
        }
  
      } 
      catch (error) 
      {
        console.error('Error during logout:', error);
      }
    };

    return (
    <NavbarBs sticky="top" className = {classes.navbar}>
        <Container>
            <Nav className= "me-auto">
                
                <Nav.Link to="/" as={NavLink}>
                    <Button className = {classes.button}>
                    Home
                    </Button>
                </Nav.Link>

                <Nav.Link to="/store" as={NavLink}>
                    <Button className = {classes.button}>
                    Store
                    </Button>
                </Nav.Link>

                <Nav.Link to="/transport-tickets" as={NavLink}>
                    <Button className = {classes.button}>
                    Transport
                    </Button>
                </Nav.Link>

                <Nav.Link to="/dashboard" as={NavLink}>
                    <Button className = {classes.button}>
                    Dashboard
                    </Button>
                </Nav.Link>

                <Button onClick={handleLogout} style={{ color: 'white', backgroundColor: 'transparent', boxShadow: 'none' }}> <ExitToAppIcon /> </Button>
                
                {cartQuantity > 0 && (<Button onClick={openCart} style={{...summarybuttonStyle}}><AddShoppingCart />{cartQuantity}</Button>)}

            </Nav>
            {/* Editing this button */}
            {cartQuantity > 0 &&(<Button 
                onClick={openCart}
                style= {{ width: "3rem", height: "3rem", position: "relative"}}
                variant= "outline-primary" 
                className="rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path fill-rule="nonzero" d="M15.366 3.438L18.577 9H22v2h-1.167l-.757 9.083a1 1 0 0 1-.996.917H4.92a1 1 0 0 1-.996-.917L3.166 11H2V9h3.422l3.212-5.562 1.732 1L7.732 9h8.535l-2.633-4.562 1.732-1zM18.826 11H5.173l.667 8h12.319l.667-8zM13 13v4h-2v-4h2zm-4 0v4H7v-4h2zm8 0v4h-2v-4h2z"/> </g> </svg>
                <div 
                    className= "rounded-circle bg-danger d-flex justify-content-center align-items-center" 
                    style= {{ 
                        color: "white", 
                        width: "1.5rem", 
                        height: "1.5rem", 
                        position: "absolute", 
                        bottom: 0, 
                        right: 0,
                        transform: "translate(25%, 25%)",
                    }}
                > 
                    {cartQuantity}
                </div>
            </Button>
            )}
        </Container>
    </NavbarBs>
    )
}

export default Navbar;