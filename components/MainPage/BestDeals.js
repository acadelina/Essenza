import styles from "../../styles/home.module.css"

export default function BestDeals() {
    return (
        <div className={styles.bestDealsWrapper} >
            <h1 className={"bestDealsText"} style={{color:"#DF9151"}}>BEST</h1>
            <h1 className={"bestDealsText"}>&nbsp;&nbsp;&nbsp;DEALS</h1>
        </div>
    )
}