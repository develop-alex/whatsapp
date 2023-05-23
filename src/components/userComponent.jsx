import React from 'react';
import Cart from "../ui/cart/cart";

const UserComponent = ({children}) => {
    return (
        <Cart>
            <h3>Мой номер: {children}</h3>
        </Cart>
    );
};

export default UserComponent;