import useFetch from "../utils/useFetch";
import CartProduct from "../components/Cart/CartProduct";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useCart} from "../utils/CartContext";
import styles from "../styles/cart.module.css";


export default function Cart() {
    const {sessionId} = useCart();
    console.log(sessionId);
    const {data: fetchedProducts, dataError, dataLoading} = useFetch(
        sessionId
            ? {
                address: `http://localhost:5000/api/carts/${sessionId}`,
                hasToken: false,
            }
            : {}
    );
    console.log(fetchedProducts);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
            localStorage.setItem("cart", JSON.stringify(fetchedProducts));
        }
    }, [fetchedProducts]);

    const totalCount = products.reduce(
        (sum, item) => sum + Number(item.quantity) * Number(item.price),
        0
    );

    const updateQuantity = (variant, newQuantity) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.var === variant ? { ...p, quantity: newQuantity } : p
            )
        );
    };

    return (
        <div className={styles.cartPage}>
            <h1 className={`headerText ${styles.pageHeader}` } >CART</h1>
            <div className={styles.line} ></div>
            <div className={styles.productsList}>
                {(products || []).map((product) => (
                    <CartProduct key={product.var} name={product.name} brand={product.brand} image={product.image} volume={product.volume}
                                 quantity={product.quantity} price={product.price} id={product.id} variant={product.var}
                                 onRemove={(id) => setProducts((prev) => prev.filter((p) => p.var !== id))}
                                 onQuantityChange={(newQuantity) => updateQuantity(product.var, newQuantity)}
                    />
                ))}
            </div>
            <div className={styles.line}></div>

            <div className={styles.cartFooter}>
                <div>
                    <input placeholder={"Your cupon"} className={`brandCase ${styles.couponInput}`}/>
                    <button className={styles.casseteBtn}>ADD</button>
                </div>
                <div className={styles.total}>
                    <h1 className={`headerText ${styles.totalText}`}>TOTAL:&nbsp;{totalCount}&nbsp;$</h1>
                    <Link href={'/checkout'}>
                        <button className={"cassete"} style={{width: "7vw"}}>BUY</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}