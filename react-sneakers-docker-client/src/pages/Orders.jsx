import axios from "axios";
import React from "react";

import Card from '../components/Card/index'

function Orders(){
    //список всех товаров из всех заказов с сервера
    const [orders, setOrders] = React.useState([]);
    //флаг формирования списка всех товаров из всех заказов с сервера
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => { 
            try {
                //грузим все заказы с сервера
                const {data} = await axios.get('http://localhost:4008/orders');

                //выделяем список всех товаров из всех заказов с сервера
                setOrders(data);                

                //формирование списка всех товаров из всех заказов с сервера окончено
                setIsLoading(false);
            } catch (error) {
                alert('Error when requesting orders');
                console.error(error);
            }
        })();
    }, [])

    return (
        <div className="content p-40">
            {/*Заголовок */}
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            {/*Выводим список всех товаров по всем заказам из сервера или список 
               из восьми пустых клеток если заказов на сервере нет. */}
            <div className="d-flex flex-wrap">  
                {(isLoading ? [...Array(8)] : orders).map((items, index) => {  
                    return (
                        items !== undefined ? items.items === undefined ? 
                        <></> 
                        : 
                        (items.items).map((item, index) => (  
                            <Card key={index} loading={isLoading} {...item}/> 
                        ))
                        : 
                        <></> 
                    )           
                })}
            </div>
        </div>
    )
}

export default Orders;