import useFetch from "../../utils/useFetch";
import { useEffect, useState } from "react";
import styles from "../../styles/admin.module.css";
import OrderCard from "../../components/Admin/OrderCard";

export default function Orders() {
    const { data: fetchedOrders, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/orders",
        hasToken: false,
    });

    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        if (Array.isArray(fetchedOrders)) {
            setOrders(fetchedOrders);
        }
    }, [fetchedOrders]);

    const filteredOrders =
        filter === "ALL"
            ? orders
            : orders.filter((order) => order.status === filter);

    return (
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>ORDERS</h1>
            <div className={styles.darkLine} style={{ marginBottom: "10px" }}></div>


            <div className={styles.orders}>
                <label className="headerText">Filter by status:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={`headerText ${styles.filterOrders}`}
                >
                    <option value="ALL">All</option>
                    <option value="PLACED">Placed</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELED">Canceled</option>
                </select>
            </div>


            {filteredOrders.length === 0 ? (
                <p className={"headerText2"}>No orders found.</p>
            ) : (
                filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))
            )}
        </div>
    );
}
