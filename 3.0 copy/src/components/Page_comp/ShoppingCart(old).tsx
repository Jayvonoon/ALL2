import React from 'react'
import { Offcanvas, Stack,Button, CloseButton } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { CartItem } from "./CartItem.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import storeItems from "../data/items.json"
import transportItems from "../data/TransportItems.json";
import { Link } from 'react-router-dom';
import MinimizeIcon from '@material-ui/icons/Minimize';
//import Clear from '@material-ui/icons/Clear';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart'

type ShoppingCartProps = {
    isOpen: boolean
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen }) => {
    const { closeCart, cartItems, clearCart } = useShoppingCart()
    const storeTotal = cartItems
    .filter((item) => item.type === "store") // Filter store items
    .reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

  const transportTotal = cartItems
    .filter((item) => item.type === "transport") // Filter transport tickets
    .reduce((total, cartItem) => {
      const item = transportItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);

  const total = storeTotal + transportTotal;

    // return (
    // <Offcanvas show= {isOpen} onHide= {closeCart} placement="end" style = {{right: 0}}>
    //     <Offcanvas.Header closeButton> 
    //       <Offcanvas.Title>Summary</Offcanvas.Title> 
    //       <Button onClick={closeCart} style={{ color: 'blue', backgroundColor: 'transparent', boxShadow: 'none' }}> <MinimizeIcon/> </Button>
    //     </Offcanvas.Header>
    //     <Offcanvas.Body>
    //         <Stack gap={3}>
    //             {cartItems.map(item => (
    //                 <CartItem key= {item.id} {...item} />
    //             ))}
    //             <div className="ms-auto fw-bold fs-5">
    //             Total {formatCurrency(total)}
    //             <Button onClick={clearCart} style={{ color: 'blue', backgroundColor: 'transparent', boxShadow: 'none' }}> <Clear/> </Button>
    //             </div>
    //         </Stack>
    //         <Link to="/checkout" onClick={closeCart}>
    //             <button>Checkout</button>
    //         </Link>
    //     </Offcanvas.Body>
    // </Offcanvas>
    // )
    return (
        <Offcanvas show = {isOpen} onHide = {closeCart}>
          <Offcanvas.Header> 
            <Offcanvas.Title>Summary
            <Button onClick={closeCart} style={{ color: 'blue', backgroundColor: 'transparent', boxShadow: 'none' }}> <MinimizeIcon/> </Button>
              </Offcanvas.Title> 
            
          </Offcanvas.Header>
          <Offcanvas.Body>
              <Stack gap={3}>
                  {cartItems.map(item => (
                      <CartItem key= {item.id} {...item} />
                  ))}
                  <div className="ms-auto fw-bold fs-5">
                  Total {formatCurrency(total)}
                  
                  </div>
              </Stack>
              <Button onClick={clearCart} style={{ color: 'blue', backgroundColor: 'transparent', boxShadow: 'none' }}> <RemoveShoppingCart/> </Button>
              <div></div>
              <Link to="/checkout" onClick={closeCart}>
                  <button>Checkout</button>
              </Link>
          </Offcanvas.Body>
      </Offcanvas>
      )
}

export default ShoppingCart;