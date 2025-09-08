import { useState } from "react";

export default function useRemoveFromCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeFromCart = async (userId, varId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `http://localhost:5000/api/carts`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        id_user: userId,
                        id_var: varId
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    return { removeFromCart, loading, error };
}
