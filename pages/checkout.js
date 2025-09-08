import {useState, useEffect} from "react";
import styles from "../styles/checkout.module.css";
import {useAuth} from "../utils/useAuth";
import usePlaceOrder from "../utils/usePlaceOrder";
import useFetch from "../utils/useFetch";
import AlertBox from "../components/AlertBox";
import {useCart} from "../utils/CartContext";

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        apartment: "",
        postalCode: "",
        city: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const {user, checkAuth} = useAuth();
    const {placeOrder, loading,} = usePlaceOrder();
    const [error, setError] = useState(null);
    const {sessionId} = useCart();

    const {data: fetchedProducts, dataError, dataLoading} = useFetch(
        sessionId
            ? {
                address: `http://localhost:5000/api/carts/${sessionId}`,
                hasToken: false,
            }
            : {}
    );

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
        }
    }, [fetchedProducts]);


    const total = products.reduce(
        (sum, item) => sum + Number(item.quantity) * Number(item.price),
        0
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {

        if (user) {
            try {
                await placeOrder(sessionId, user.username, total, "PLACED");
                localStorage.removeItem("cart");
                setProducts([]);
                window.location.href = "/order-success";
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        } else {
            try {
                await placeOrder(sessionId, sessionId, total, "PLACED");
                localStorage.removeItem("cart");
                setProducts([]);
                window.location.href = "/order-success";
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        }

    };

    return (
        <div className={styles.checkoutContainer}>
            <h1 className={`headerText ${styles.checkoutHeader}`}>CHECKOUT</h1>
            <div className={styles.line}/>
            <div className={styles.content}>
                <div className={styles.formWrapper}>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <h2 className={"headerText"} style={{fontSize: "4vh"}}>Recipient Details</h2>
                            <div className={styles.grid}>
                                <input name="firstName" value={formData.firstName} onChange={handleChange}
                                       placeholder="First Name" className={"brandCase"} required/>
                                <input name="lastName" value={formData.lastName} onChange={handleChange}
                                       placeholder="Last Name" className={"brandCase"} required/>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       placeholder="E-mail" className={"brandCase"} required/>
                                <input name="phone" value={formData.phone} onChange={handleChange}
                                       placeholder="+40 Phone Number" className={"brandCase"} required/>
                            </div>
                        </section>

                        <section>
                            <h2 className={"headerText"} style={{fontSize: "4vh"}}>Shipping Address</h2>
                            <div className={styles.grid}>
                                <input name="street" value={formData.street} onChange={handleChange}
                                       placeholder="Street and Number" className={"brandCase"} required/>
                                <input name="apartment" value={formData.apartment} onChange={handleChange}
                                       placeholder="Apartment, Floor (Optional)" className={"brandCase"}/>
                                <input name="postalCode" value={formData.postalCode} onChange={handleChange}
                                       placeholder="Postal Code" className={"brandCase"} required/>
                                <input name="city" value={formData.city} onChange={handleChange} placeholder="City"
                                       className={"brandCase"} required/>
                            </div>
                        </section>

                        <section>
                            <h2 className={"headerText"} style={{fontSize: "4vh"}}>Payment Details</h2>
                            <div className={styles.grid}>
                                <input name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                                       placeholder="Card Number" className={"brandCase"} required/>
                                <input name="expiryDate" value={formData.expiryDate} onChange={handleChange}
                                       placeholder="MM/YY" className={"brandCase"} required/>
                                <input name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV"
                                       className={"brandCase"} required/>

                            </div>

                        </section>

                    </form>


                </div>

                <div className={styles.summaryBox}>
                    <h2 className={`headerText ${styles.summaryHeader}`}>Order Summary</h2>
                    <div className={styles.productsList}>
                        {products.length > 0 ? products.map((item) => (
                            <div key={item.var} className={styles.productItem}>
                                <img className={styles.productImage} src={item.image}/>
                                <div className={styles.productInfo}>
                                    <span
                                        className={`headerText ${styles.productText}`}>{item.name} x {item.quantity}</span>
                                    <span
                                        className={`headerText ${styles.productText}`}>{item.price * item.quantity}$</span>
                                </div>
                            </div>
                        )) : <p>No items in cart.</p>}
                    </div>

                    <div className={`headerText ${styles.totalRow}`}>
                        <span>Total:</span>
                        <span>{total}$</span>
                    </div>
                    <div className={styles.placeOrderWrapper}>
                        <button type="submit" className={`cassete`} onClick={handleSubmit}>Place Order</button>
                    </div>
                </div>
            </div>
            <AlertBox message={error} type={"error"} onClose={() => setError(null)}/>
        </div>
    );
}
