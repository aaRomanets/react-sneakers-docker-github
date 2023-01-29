import React from 'react'
import {Routes, Route} from "react-router-dom";
import axios from 'axios'

import Header from './components/Header';
import Drawer from './components/Drawer/index';
import AppContext from './context';

import Home from './pages/Home';
import Orders from './pages/Orders';

function App() 
{
  //полный список товаров
  const [items, setItems] = React.useState([]);
  //список товаров в корзине
  const [cartItems, setCartItems] = React.useState([]);
  //минимальная цена необходимого товара
  const [searchValue, setSearchValue] = React.useState('');
  //флаг открытия корзины товара
  const [cartOpened, setCartOpened] = React.useState(false);

  //Этот хук useEffect сначала срабатывает при каждом перезапуске сайта а
  //затем при каждом изменении каждого из свойств находящихся в []
  React.useEffect(() => {
    async function fetchData() {
      try {
        //скачиваем все данные о товарах с сервера, которые можно выбрать
        const [itemsResponse] = await Promise.all([
          axios.get('http://localhost:4008/items')
        ]);

        //Все товары которые можно выбрать
        setItems((itemsResponse).data);
      } catch (error) { 
        alert('Error when requesting data; (')
        console.error(error);
      }
    }

    fetchData();
  }, [])

  //функция наполнения корзины товаров (если добавляется тот товар который уже есть в корзине то он удаляется из корзины)
  const onAddToCart = async (obj) => {
    try 
    {
      //удаляем товар из корзины
      const findItem = cartItems.find((item) => Number(item.id) === Number(obj.id)); 
      if (findItem) 
      {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } 
      else 
      {
        //добавляем новый товар в корзину
        setCartItems((prev) => [...prev, obj]);
      }
    } 
    catch (error) 
    {
      alert('Error when adding to the cart');
    }
  }

  //функция удаления товара из корзины
  const onRemoveItem = (id) => 
  {
    try 
    {
      //удаляем товар из корзины
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } 
    catch (error) 
    {
      alert('Error when removing from the cart');
      console.error(error);
    }
  }

  //функция изменения минимальной цены необходимого товара
  const onChangeSearchInput = (event) => 
  {
    setSearchValue(event.target.value);
  }

  //функция которая проверяет существует ли в корзине добавляемый уже товар
  const isItemAdded = (id) => 
  {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  };

  return (
    <AppContext.Provider 
      //формируем контекст
      value ={{
        cartItems, 
        isItemAdded,
        setCartOpened,
        setCartItems
      }}>
      <div className="wrapper clear">
        {/*Корзина */}
        <Drawer 
          onClose={() => setCartOpened(false)} 
          onRemove={onRemoveItem}  
          items={cartItems}
          opened={cartOpened}
        /> 
        
        {/*Заголовок, в него мы отправляем функцию открытия товара */}
        <Header onClickCart={() => setCartOpened(true)}/>
      
        <Routes>
        {/*Центральная страница интернет - магазина*/}
        <Route path="/" exact
          element = {<Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
          />}
        />

        {/*Переход на страницу оформленных заказов */}
        <Route path="/orders" exact element={<Orders/>} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App; 