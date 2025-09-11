import styles from "../../styles/admin.module.css";
import {useState} from "react";
import AlertBox from "../AlertBox";

export default function CheckProductCard({brand, name, image, id, bestDeals, setBestDeals}) {
    const [error, setError] = useState(null);

    const toggleBestDeal = () => {
        if (bestDeals.includes(id)) {
            setBestDeals(bestDeals.filter(pid => pid !== id));
        } else if (bestDeals.length < 3) {
            setBestDeals([...bestDeals, id]);
        } else {
            setError("You can select maximum 3 best deals");
        }
    };

    return (
        <div className={styles.editProductCard}>
            <div className={styles.productRow}>
                <img src={image} className={styles.productImage} alt="product"/>
                <div className={styles.productInfo}>
                    <h1 className={`headerText ${styles.brandText}`}>{brand}</h1>
                    <h1 className={`headerText ${styles.nameText}`}>{name}</h1>
                </div>
                <div className={styles.priceRemove}>
                    <input
                        type="checkbox"
                        checked={bestDeals.includes(id)}
                        onChange={toggleBestDeal}
                        color={"#BC5D2F"}
                        style={{marginLeft:"10px",accentColor:"#BC5D2F"}}
                    />
                </div>
            </div>
            <div className={styles.divider}></div>
            <AlertBox message={error} type={"error"} onClose={() => setError(null)} />
        </div>
    )
}
