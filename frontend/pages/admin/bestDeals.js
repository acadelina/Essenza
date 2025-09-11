import styles from "../../styles/admin.module.css";
import CheckProductCard from "../../components/Admin/CheckProductCard";
import useFetch from "../../utils/useFetch";
import {useEffect, useState} from "react";
import AlertBox from "../../components/AlertBox";

export default function BestDeals() {
    const { data: fetchedProducts, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (Array.isArray(fetchedProducts)) {
            setProducts(fetchedProducts);
            localStorage.setItem("cart", JSON.stringify(fetchedProducts));
            const initialBestDeals = fetchedProducts
                .filter(p => p.bestDeal == 1 || p.bestDeal === 1)
                .map(p => p.id);
            console.log(initialBestDeals);
            setBestDeals(initialBestDeals);
        }
    }, [fetchedProducts]);

    const [bestDeals, setBestDeals] = useState([]);

    const [info, setInfo] = useState(null);
    return (
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>BEST DEALS</h1>
            <div className={styles.darkLine}></div>
            <div className={styles.productsList}>
                {(products || []).map((product) => (
                    <CheckProductCard brand={product.brand} image={product.image} name={product.name} id={product.id}
                                      onRemove={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
                                      bestDeals={bestDeals}
                                      setBestDeals={setBestDeals}
                    />
                ))}</div>
            <div className={styles.saveButtonWrapper} style={{marginTop:"0"}}>
                <button className={"cassete"} onClick={async () => {
                    const token = localStorage.getItem("token");
                    await fetch("http://localhost:5000/api/products/best-deals", {
                        method: "PUT",
                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                        body: JSON.stringify({bestDeals})
                    });
                   setInfo("Best Deals saved!");
                }}>
                    Save Best Deals
                </button>
            </div>
            <AlertBox message={info} onClose={() => setInfo(null)} />
            <div className={styles.darkLine}></div>
        </div>


    )
}