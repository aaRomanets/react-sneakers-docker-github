import React from 'react'
import AppContext from '../../context';
import styles  from './Card.module.scss'

function Card({
    //идентификатор товара
    id,             
    //название товара
    title,          
    //картинка товара
    imageUrl,       
    //цена товара
    price,          
    //добавляем товар в корзину товаров
    onPlus
}) {
    //выясняем по функции из контекста находится ли этот товар в корзине или нет
    const {isItemAdded} = React.useContext(AppContext); 
    
    //полная информация о товаре
    const obj = {id, title, imageUrl, price};   

    //функция пополнения корзины товаров
    const onClickPlus = () => {
        onPlus(obj);
    }

    return (
        <div className={styles.card}>
            <img width='100%' height={135} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Price:</span>
                    <b>{price} rub.</b>
                </div>
                {onPlus && <img 
                    className={styles.plus}
                    onClick={onClickPlus} 
                    src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} 
                    alt="Plus"
                />}
            </div>
        </div>
    )
}

export default Card; 