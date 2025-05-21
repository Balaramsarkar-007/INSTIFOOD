import React, {createContext, useState, useContext, useEffect, useCallback} from "react";
import {useCart} from "./CartContext";


const OrderContext = createContext();

export const OrderProvider = ({children}) => {
    const {cart} = useCart();
    const [order, setOrder] = useState({
        userId : "",
        ownerId : "",
        orderStatus : [
            {
                statusType : "ORDER ACCEPTED",
                status : "PENDING",
            },
        ],
        items : '',
        amount : 0,
        paymentMethod : "",
        deliveryType : "",
        orderAddress : "",
    });

    const updateOrderDetails = (details) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            ...details,
        }));
    }

    const setOrderAddress = useCallback((address) => {
        setOrder(prev => ({...prev, orderAddress: address}));
    }, []);

    const setUserId = (userId) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            userId : userId,
        }));
    } 

    const setOwnerId = (ownerId) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            ownerId : ownerId,
        }));
    } 

    const setpaymentMethod = (payment) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            paymentMethod : payment,
        }));
    }

    const setItems = (items) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            items : items,
        }));
    }

    const setAmmount = (ammount) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            amount : ammount,
        }));
    }

    const clearOrder = () => {
        setOrder({
            userId : "",
            ownerId : "",
            orderStatus : [
                {
                    statusType : "ORDER ACCEPTED",
                    status : "PENDING",
                },
            ],
            items : [],
            amount : 0,
            paymentMethod : "",
            orderAddress : {},
        });
    };

    useEffect(() => {
        if (cart?.length > 0) {
            const totalAmmount = cart.reduce(
                (total, item) => total + (item.price * item.quantity), 0);
            setOrder(prev => ({
                ...prev,
                items: cart,
                amount: totalAmmount
            }));
        }
    }, [cart]);

    console.log(order);

    return (
        <OrderContext.Provider value={{order, setOrderAddress, setpaymentMethod, clearOrder, setOwnerId, updateOrderDetails}}>  
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => useContext(OrderContext);