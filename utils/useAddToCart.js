import {useContext, useEffect, useState} from "react";
import {useAuth} from "./useAuth";


export default function useAddToCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();




    const addToCart = async ( product_id, volume, quantity = 1) => {
        try {
            setLoading(true);
            setError(null);

            let cartOwner = user?.username || localStorage.getItem("cartSession");
            if (!cartOwner) {
                cartOwner = crypto.randomUUID();
                localStorage.setItem("cartSession", cartOwner);
            }

            console.log(cartOwner);
            const resCart = await fetch("http://localhost:5000/api/carts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id:cartOwner})
            });

            if (!resCart.ok) {
                throw new Error("Failed to create/get cart");
            }

            const cartData = await resCart.json();

            console.log(cartData.cartId);
            console.log(product_id,volume,quantity);
            const resAdd = await fetch("http://localhost:5000/api/carts/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id_cart: cartData.cartId,
                    id_product: product_id,
                    volume: volume,
                    quantity: quantity,

                })
            });

            if (!resAdd.ok) {
                throw new Error("Failed to add product to cart");
            }


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


    return {addToCart, loading, error};
}


