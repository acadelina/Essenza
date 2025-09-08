import BestDeals from "../components/MainPage/BestDeals";
import ProductCard from "../components/MainPage/ProductCard";
import Catalog from "../components/MainPage/Catalog";
import styles from "../styles/home.module.css"


export default function Home() {
    return (
        <div>
            <div className={styles.mainSection}>

                <div className={styles.bestDealsPosition}>
                    <BestDeals/>
                </div>

                <div  className={`colordiv ${styles.colordiv1}`}>
                </div>
                <div className={styles.productPosition1}>
                    <ProductCard/>
                </div>

                <div className={`colordiv ${styles.colordiv2}`}>
                </div>
                <div className={styles.productPosition2}>
                    <ProductCard/>
                </div>

                <div className={`colordiv ${styles.colordiv3}`}>
                </div>
                <div className={styles.productPosition3}>
                    <ProductCard/>
                </div>
            </div>
            <div>
                <Catalog/>

            </div>
        </div>
    );
}