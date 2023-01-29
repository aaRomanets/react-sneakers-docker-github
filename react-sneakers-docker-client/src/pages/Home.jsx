import React from "react";

import Card from '../components/Card/index';

function Home({
    //полный список товаров
    items,               
    //желаемая минимальная цена товара, введенная пользователем
    searchValue,         
    //фиксатор желаемой минимальной цены товара, вводимой пользователем
    setSearchValue,      
    //функция ввода минимальной цены товара желаемой пользователем
    onChangeSearchInput,
    //функция добавления товара в корзину 
    onAddToCart        
})  {
    
    //функция составления списка товаров на основании минимальной цены
    const renderItems = () => {
        //составляем список товаров на основании минимальной цены searchValue
        const filtredItems = items.filter((item) => 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return ((filtredItems).map((item, index) => (
            //Каждая карточка из составленного списка
            <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                {...item}
            />
        )))
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Search by request: "${searchValue}"` : `All sneakers`}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    { searchValue && (
                        //кнопка сброса метки поиска названия товара
                        <img 
                            onClick={() => setSearchValue('')} 
                            className="clear cu-p" 
                            src="/img/btn-remove.svg" 
                            alt="Clear" 
                        />
                    )}
                    {/*Окно ввода метки поиска названия товара */}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
                </div>
            </div>

            {/*Поле ввода списка товаров, установленного на основании заданной минимальной цены searchValue*/}
            <div className="d-flex flex-wrap">          
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;