import styles from "../../styles/admin.module.css"
import {useState} from "react";
import AlertBox from "../AlertBox";

export default function OrderCard({order}) {
    const [status, setStatus] = useState(order.status);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState(null);


    const statuses = [
        "PLACED",
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELED",
    ];

    const updateStatus = async () => {

        try {
            const res = await fetch(`http://localhost:5000/api/orders/${order.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({status}),
            });

            if (!res.ok) {
                setError("Failed to update status");
            }

            setInfo("Status updated!");
        } catch (err) {

            setError("Error updating status");
        }
    };

    return (
        <div className={styles.orderCard}>
            <div style={{width: '50%'}}>
                <h3 className={`headerText ${styles.orderHeader}`} onClick={()=>window.location.href=`/admin/order/${order.id}`}>
                    Order #{order.id}
                </h3>
                <p className={`headerText ${styles.orderText}`}>Total: ${order.total}</p>
                <div className={styles.orderCardItems}>
                    <h4 className={`headerText ${styles.orderText}`}>ITEMS:</h4>
                    <div>
                        {order.items.map((item, index) => (
                            <img src={item.image} alt={item.name} height={"40px"} width={"40px"}
                                 style={{objectFit: "contain"}} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.orderCardStatus}>
                <div className={`dropdown ${styles.orderStatus}`}>
                    <a
                        className={`headerText `}>
                        {status}
                    </a>
                    <div className="dropdownContent">
                        {statuses.map((s) => (
                            <a
                                key={s}
                                onClick={() => setStatus(s)}
                                className="dropdownItem"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>

                <img src={"/images/check.png"} alt={"check"} width={25} height={25}
                     style={{borderRadius: "5px", cursor: "pointer"}} onClick={updateStatus}/>

            </div>
            <AlertBox message={error} type={"error"} onClose={() => setError(null)}/>
            <AlertBox message={info} onClose={() => setInfo(null)}/>

        </div>
    )
}