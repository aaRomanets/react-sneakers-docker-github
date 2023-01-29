import React from 'react'
import AppContext from '../context';

export const useCart = () => {
    //из контекста вытаскиваем корзину товаров
    const {cartItems, setCartItems} = React.useContext(AppContext);
    //считаем полную стоимость товаров по всей корзине
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    //результат сформированного хука
    return {cartItems, setCartItems, totalPrice};
}