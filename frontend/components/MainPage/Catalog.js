import ProductCard from "./ProductCard";
import useFetch from "../../utils/useFetch";
import Link from "next/link";
import styles from "../../styles/home.module.css"


export default function Catalog() {


    const { data: products, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });

    if (dataLoading) return <p>Loading...</p>;
    if (dataError) return <p style={{color:"red"}}>{dataError}</p>;

    return(
        <div className={styles.catalogWrapper}>
            <div className={`line ${styles.darkLine}`} ></div>
            <div className={`line ${styles.lightLine}`}></div>
            <h1 className={`title ${styles.catalogTitle}`} >CATALOG</h1>
            <div className="horizontalScrollView">
                <div className="scrollContent">
                    {(products || []).map((product) => (
                        <Link
                            key={product.id}
                            href={'/product/' + product.id}
                            style={{ textDecoration: 'none' }}
                        >
                        <ProductCard
                            key={product.id}
                            brand={product.brand}
                            name={product.name}
                            price={product.minPrice}
                            image={product.image}
                        /></Link>
                    ))}
                </div>
            </div>
        </div>
    )
}