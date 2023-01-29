import React from 'react'
import AppContext from '../context'

//информация о том что с корзиной товаров происходит либо она пустая либо товар из нее был кому то продан
const Info = ({title, image, description}) => 
{
    //из контекста вытаскиваем флаг открытия корзины товаров
    const {setCartOpened} = React.useContext(AppContext); 

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img 
                className="mb-20" 
                width="120px" 
                src={image} 
                alt="Empty" 
            />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            {/*Кнопка закрытия информации о сделке с корзиной товаров и возвращения на страницу магазина */}
            <button onClick={() => setCartOpened(false)} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Go back
            </button>
        </div>
    )
}

export default Info;