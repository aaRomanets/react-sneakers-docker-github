import React from 'react'
import axios from 'axios'

import Info from '../Info'
import {useCart} from '../../hooks/useCart'

import styles from './Drawer.module.scss';

function Drawer({onClose, onRemove, items=[], opened}) {
    //информация о заказе из хука useCart
    const {cartItems, setCartItems, totalPrice} = useCart();
    //идентификатор очередного заказа
    const [orderId, setOrderId] = React.useState(null);
    //флаг осуществления результата
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    //флаг загрузки заказа на сервер
    const [isLoading, setIsLoading] = React.useState(false);

    //фиксируем заказ в корзине (оформляем заказ)
    const onClickOrder = async () => 
    {
        try 
        {
            //начало отправления заказа из корзины товаров на сервер
            setIsLoading(true);
            //отправляем заказ на сервер, data - то что отправлено
            const {data} = await axios.post('http://localhost:4008/orders', {items: cartItems});
            //фиксируем идентификатор отправленного на сервер заказа
            setOrderId(data.id);
            //фиксируем флаг, говорящий о том, что заказ на сервер отправлен
            setIsOrderComplete(true);
            //опустошаем корзину товаров
            setCartItems([]);
        } 
        catch (error) 
        {
            alert('Не удалось создать заказ.');
        }
        //процесс отправки заказа из корзины товаров на сервер окончен
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                {/*Заголовок */}
                <h2 className="d-flex justify-between mb-30">
                    Basket
                    {/*Кнопка скрытия корзины */}
                    <img
                        onClick={onClose}
                        className="cu-p" 
                        src="/img/btn-remove.svg" 
                        alt="Close" 
                    />
                </h2>

                {/*Список товаров в корзине перед оформлением заказа*/}
                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className="items">
                            {items.map((obj) =>(
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    {/*Картина товара*/}
                                    <div 
                                        style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                        className="cartItemImg"  
                                    >
                                    </div>
                                    <div className="mr-20 flex">
                                        {/*Название товара*/}
                                        <p className="mb-5">{obj.title}</p>
                                        {/*Цена товара*/}
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    {/*Кнопка удаления товара из корзины*/}
                                    <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn" 
                                        src="/img/btn-remove.svg" 
                                        alt="Remove" 
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="cartTotalBlock">
                            <ul>
                                {/*Цена всего заказа*/}
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                {/*Налог на цену всего заказа*/}
                                <li>
                                    <span>Tax 5%:</span>
                                    <div></div>
                                    <b>{5*totalPrice/100} руб.</b>
                                </li>
                            </ul>
                            {/*Кнопка оформления всего заказа*/}
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                Place an order
                                <img src="/img/arrow.svg" alt="Arrow"/>
                            </button>
                        </div>
                    </div>
                ) : (
                    //Информация об успешном оформлении всего заказа
                    <Info 
                        title={ isOrderComplete ? "The order has been placed!" : "The basket is empty"} 
                        description={ isOrderComplete ? `Your order #${orderId} it will be delivered by courier soon` : 
                        "Add at least one pair of sneakers to make an order."} 
                        image={ isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                    />
                )}
            </div>
        </div>
    )
}

export default Drawer;