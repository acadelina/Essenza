import {useEffect, useState} from "react";
import styles from "../../styles/profile.module.css";


export default function OrdersHistory(username) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/api/orders/user/${username.username}`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((err) => console.error(err));

    }, [username]);
    return (
        <div className={styles.ordersContainer}>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order.id}
                        className={styles.orderCard}
                    >
                        <h3 className={`headerText ${styles.orderHeader}`}>
                            Order #{order.id} – {order.status}
                        </h3>
                        <p className={`headerText ${styles.orderTotal}`}>Total: ${order.total}</p>

                        <h4 className={`headerText ${styles.itemsHeader}`}>ITEMS:</h4>
                        <ul className={styles.itemsList}>
                            {order.items.map((item, index) => (

                                <li className={`headerText ${styles.item}`} key={index}>
                                    <div className={styles.itemInfo}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={styles.itemImage}
                                        />
                                        <span style={{textTransform: "capitalize"}}>{item.name}</span>
                                    </div>

                                    <div>
                                        {item.volume}ml x {item.quantity}
                                    </div>
                                    ${item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    )
}