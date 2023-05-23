import React from 'react';
import classes from './cart.module.sass';

const Cart = ({children}) => {
    return (
        <div className={classes.cart}>
            {children}
        </div>
    );
};

export default Cart;