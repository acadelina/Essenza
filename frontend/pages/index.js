import BestDeals from "../components/MainPage/BestDeals";
import ProductCard from "../components/MainPage/ProductCard";
import Catalog from "../components/MainPage/Catalog";
import styles from "../styles/home.module.css"
import useFetch from "../utils/useFetch";
import {useEffect, useState} from "react";
import Link from "next/link";



export default function Home() {
    const { data: fetchedProducts, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
            localStorage.setItem("cart", JSON.stringify(fetchedProducts));
        }
    }, [fetchedProducts]);

    const bestDeals = products.filter(p => p.bestDeal === 1 || p.bestDeal === true);
    return (
        <div>
            <div className={styles.mainSection}>

                <div className={styles.bestDealsPosition}>
                    <BestDeals/>
                </div>

                <div  className={`colordiv ${styles.colordiv1}`}>
                </div>
                <div className={styles.productPosition1}>
                    {bestDeals[0]&& <Link
                        key={bestDeals[0].id}
                        href={'/product/' + bestDeals[0].id}
                        style={{ textDecoration: 'none' }}
                    >
                      <ProductCard image={bestDeals[0].image} brand={bestDeals[0].brand} name={bestDeals[0].name} price={bestDeals[0].minPrice} />
                    </Link>}
                </div>

                <div className={`colordiv ${styles.colordiv2}`}>
                </div>
                <div className={styles.productPosition2}>
                    {bestDeals[1] && <Link
                        key={bestDeals[1].id}
                        href={'/product/' + bestDeals[1].id}
                        style={{ textDecoration: 'none' }}
                    >
                   <ProductCard image={bestDeals[1].image} brand={bestDeals[1].brand} name={bestDeals[1].name} price={bestDeals[1].minPrice} />
                    </Link>}
                </div>

                <div className={`colordiv ${styles.colordiv3}`}>
                </div>
                <div className={styles.productPosition3}>
                    {bestDeals[2] && <Link
                        key={bestDeals[2].id}
                        href={'/product/' + bestDeals[2].id}
                        style={{ textDecoration: 'none' }}
                    >
                    <ProductCard image={bestDeals[2].image} brand={bestDeals[2].brand} name={bestDeals[2].name} price={bestDeals[2].minPrice} />
                    </Link>}
                </div>
            </div>
            <div>
                <Catalog/>

            </div>
        </div>
    );
}