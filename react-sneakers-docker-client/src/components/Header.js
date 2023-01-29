import React from 'react'
import {Link} from 'react-router-dom'

import {useCart} from '../hooks/useCart'

function Header(props) 
{
    //стоимость товаров в корзине товаров вытаскивается из созданного хука useCart
    const {totalPrice} = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            {/*Заголовок сайта */}
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logotype"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Shop for the best sneakers</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                {/*Появление корзины с выбранным товаром */}
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="Basket"/>
                    <span>{totalPrice} руб.</span>
                </li>
                {/*Появление списка всех выбранных товаров по всем корзинам*/}
                <li>
                    <Link to="/orders">
                        <img width={18} height={18} src="/img/user.svg" alt="User"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;