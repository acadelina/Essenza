import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children, user }) {
    const [sessionId, setSessionId] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let id = localStorage.getItem("cartSession");
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("cartSession", id);
        }
        setSessionId(id);
    }, []);


    useEffect(() => {
        if (user?.username && sessionId !== user.username) {
            fetch("http://localhost:5000/api/carts/link", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, username: user.username })
            })
                .then(res => res.json())
                .then(() => {
                    setSessionId(user.username);
                })
                .catch(err => console.error("Eroare la link cart:", err));
        }
    }, [user]);


    useEffect(() => {
        if (!sessionId) return;

        console.log(sessionId);
        fetch(`http://localhost:5000/api/carts/${sessionId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const cartItems =  Array.isArray(data) ? data: [];
                console.log(cartItems);
                const totalCount = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0) ||0;
                console.log(totalCount);

                setCount(totalCount);console.log(count);
            })
            .catch(err => console.error("Error fetching cart:", err));

    }, [sessionId]);

    return (
        <CartContext.Provider value={{ sessionId, count, setCount,setSessionId }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
