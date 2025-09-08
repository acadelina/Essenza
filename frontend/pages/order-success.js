import styles from "../styles/checkout.module.css";

export default function SuccessOrder()
{
    return(
        <div className={styles.successContainer} >
            <div className={styles.successMain}>
                <h1 className={"headerText"}>Your order has been placed successfully!</h1>
            </div>
            <div className={styles.successSecondary}>
                <h1 className={"headerText"}>Thank you for shopping with Essenza</h1>
            </div>
        </div>
    )
}