import useAddToCart from "../../utils/useAddToCart";
import {useState} from "react";
import useRemoveFromCart from "../../utils/useRemoveFromCart";
import {useCart} from "../../utils/CartContext";
import styles from "../../styles/cart.module.css"


export default function CartProduct({
                                        id,
                                        variant,
                                        name,
                                        brand,
                                        volume,
                                        image,
                                        quantity: initialQuantity,
                                        price,
                                        onRemove,
                                        onQuantityChange
                                    }) {
    const {sessionId, count, setCount} = useCart();
    const {addToCart, loading, error} = useAddToCart();
    const {removeFromCart} = useRemoveFromCart();
    const [quantity, setQuantity] = useState(initialQuantity);


    const handlePlus = async () => {
        try {
            await addToCart(id, volume, 1);
            setQuantity((q) => {
                const newQuantity = q + 1;
                onQuantityChange?.(newQuantity);
                return newQuantity;
            });

            setCount(count + 1);
        } catch (err) {
            alert("Error adding to cart.");
            console.error(err);
        }
    }
    const handleMinus = async () => {
        try {
            if (quantity <= 1) {
                setCount(count - 1);
                await removeFromCart(sessionId, variant)
                onRemove?.(variant);
            } else {
                await addToCart(id, volume, -1);
                setQuantity((q) => q - 1);
                setCount(count - 1);
                const newQuantity = quantity - 1;
                onQuantityChange?.(newQuantity);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemove = async () => {
        try {
            console.log(variant, sessionId);
            setCount(count - quantity);
            const success = await removeFromCart(sessionId, variant);
            if (success) {

                onRemove?.(variant);

            } else {
                setCount(count + quantity);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className={styles.cartProduct}>
            <div className={styles.productRow}>
                <img src={image} className={styles.productImage} alt="product"/>
                <div className={styles.productInfo}>
                    <h1 className={`headerText ${styles.brandText}`}>{brand}</h1>
                    <h1 className={`headerText ${styles.nameText}`}>{name}</h1>
                    <h1 className={`headerText ${styles.volumeText}`}>{volume}&nbsp;ml</h1>
                </div>
                <div className={styles.quantityControl}>
                    <h1 className={`headerText ${styles.adjustBtn}`} onClick={handleMinus}>-</h1>
                    <h1 className={`brandCase ${styles.quantity}`}>{quantity}</h1>
                    <h1 className={`headerText ${styles.adjustBtn}`} onClick={handlePlus}>+</h1>
                </div>
                <div className={styles.priceRemove}>
                    <h1 className={`headerText ${styles.priceText}`}>{price * quantity}&nbsp; $</h1>
                    <img src={"/images/bin.png"} className={styles.removeBtn} onClick={handleRemove}/>
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}