import {useContext, useEffect, useState} from "react";


export default function usePlaceOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const placeOrder = async (session,user,price,status="PLACED") => {
        try {
            setLoading(true);
            setError(null);

            const resCart = await fetch("http://localhost:5000/api/carts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id:session})
            });

            if (!resCart.ok) {
                throw new Error("Failed to get cart");
            }

            const cartData = await resCart.json();

            const resAdd = await fetch("http://localhost:5000/api/orders/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    cart: cartData.cartId,
                    user: user,
                    price: price,
                    status: status,
                })
            });


            if (!resAdd.ok) {
                const errorData = await resAdd.json();
                throw new Error(errorData.error || "Eroare necunoscută");            }


            const added = await resAdd.json();
            return added;

        } catch
            (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return {placeOrder, loading, error};
}


