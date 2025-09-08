import {useState, useEffect} from "react";
import useAddToCart from "../../utils/useAddToCart";
import {useCart} from "../../utils/CartContext";
import AlertBox from "../AlertBox";
import styles from "../../styles/Product.module.css";


export default function ProductDesc({product}) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const {addToCart, loading, error} = useAddToCart();
    const {count, setCount} = useCart();
    const [info, setInfo] = useState(null);


    useEffect(() => {
        if (product.variants && product.variants.length > 0) {
            const cheapest = [...product.variants].sort((a, b) => a.price - b.price)[0];
            setSelectedVariant(cheapest);
        }
    }, [product]);


    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, selectedVariant.volume, 1);
            setInfo("Product added to cart!");
            setCount(count + 1);
        } catch (err) {
            setInfo("Error adding to cart.");
            console.error(err);
        }
    };

    const noVariants = !product.variants || product.variants.length === 0;

    return (
        <div className={styles.descContainer}>
            <h1 className={`headerText ${styles.brand}`}>{product.brand}</h1>
            <h1 className={`headerText ${styles.name}`}>{product.name}</h1>

            <div className={styles.variants}>
                {product.variants.map((variant) => (
                    <h1
                        key={variant.id}
                        className={`brandCase ${styles.variantBtn} ${selectedVariant?.id === variant.id ? styles.active : ""}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        {variant.volume} ml
                    </h1>
                ))}
            </div>


            <h1 className={`headerText ${styles.price}`}>
                {selectedVariant ? `${selectedVariant.price}$` : noVariants ? " " : ""}
            </h1>


            <button className={` ${styles.addToCartBtn} ${selectedVariant?.stock === 0 ? styles.disabled : ""}`}
                    disabled={!selectedVariant || selectedVariant.stock === 0 || noVariants}
                    onClick={handleAddToCart}
            >
                {!selectedVariant ? "OUT OF STOCK" : selectedVariant.stock === 0 ? "OUT OF STOCK" : noVariants ? "OUT OF STOCK" : "ADD TO CART"}
            </button>
            <AlertBox message={info} onClose={() => setInfo(null)}/>
        </div>
    );
}
