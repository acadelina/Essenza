import {useRouter} from "next/router";
import useFetch from "../../../utils/useFetch";
import styles from "../../../styles/admin.module.css";
import OrdersHistoryComponent from "../../../components/Profile/OrdersHistoryComponent";

export default function Order(){
    const router = useRouter();
    const { id } = router.query;

    const { data: order, dataError, dataLoading } = useFetch({
        address: id ? `http://localhost:5000/api/orders/${id}` : null,
        hasToken: false,
    });

    if (dataLoading) return <p>Loading product...</p>;
    if (dataError) return <p className={styles.error}>{dataError}</p>;
    if (!order) return <p>Order not found</p>;

    return (
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>ORDER #{order.id}</h1>
            <div className={styles.darkLine}/>
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap:"10px",marginTop:"0px"}}>
                <h1 className={`headerText ${styles.orangeText}`}>User: </h1>
                <h1 className={`headerText ${styles.thinTextUpper}` }>{order.user}</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap:"10px",marginTop:"0px"}}>
                <h1 className={`headerText ${styles.orangeText} `}>Total: </h1>
                <h1 className={`headerText ${styles.thinTextUpper}` }>{order.total}$</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row',alignItems: 'center',gap:"10px",marginTop:"0px"}}>
                <h1 className={`headerText ${styles.orangeText} `}>Status: </h1>
                <h1 className={`headerText ${styles.thinTextUpper}` }>{order.status}</h1>
            </div>

            {/*<h1 className={`headerText `}>Total: {order.total}$</h1>*/}
            {/*<h1 className={`headerText `}>Status: {order.status}</h1>*/}
            <h1 className={`headerText`}>ITEMS:</h1>
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
    )
}