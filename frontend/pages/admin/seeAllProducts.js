import useFetch from "../../utils/useFetch";
import EditProductCard from "../../components/Admin/EditProductCard";
import styles from "../../styles/admin.module.css";
import {useEffect, useState} from "react";

export default function SeeAllProducts() {
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


    return(
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>ALL PRODUCTS</h1>
            <div className={styles.darkLine}></div>
            <div className={styles.productsList}>
                {(products || []).map((product) => (
                    <EditProductCard brand={product.brand} image={product.image} name={product.name} id={product.id}
                                     onRemove={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
                    />
                ))}</div>
            <div className={styles.darkLine}></div>
        </div>
    )
}