import useFetch from "../../utils/useFetch";
import EditProductCard from "../../components/Admin/EditProductCard";
import styles from "../../styles/admin.module.css";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";

export default function SeeAllProducts() {
    const { data: fetchedProducts, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (Array.isArray(fetchedProducts)) {

            const sortedProducts = [...fetchedProducts].sort((a, b) => {
                const aOutOfStock = a.variants?.some(v => Number(v.stock) === 0);
                const bOutOfStock = b.variants?.some(v => Number(v.stock) === 0);

                if (aOutOfStock && !bOutOfStock) return -1;
                if (!aOutOfStock && bOutOfStock) return 1;
                return 0;
            });

            setProducts(sortedProducts);
            localStorage.setItem("cart", JSON.stringify(sortedProducts));
        }
    }, [fetchedProducts]);



    return(
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>ALL PRODUCTS</h1>
            <div className={styles.darkLine}></div>
            <div className={styles.productsList}>
                {(products || []).map((product) => (

                    <EditProductCard brand={product.brand} image={product.image} name={product.name} id={product.id} variants={product.variants}
                                     onRemove={(id) => setProducts((prev) => prev.filter((p) => p.id !== id))}
                    />
                ))}</div>
            <div className={styles.darkLine}></div>
        </div>
    )
}