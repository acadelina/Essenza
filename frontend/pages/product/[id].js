import {useRouter} from "next/router";
import useFetch from "../../utils/useFetch";
import ProductDesc from "../../components/ProductPage/ProductDesc";
import ProductDetails from "../../components/ProductPage/ProductDetails";
import styles from "../../styles/product.module.css";


export default function ProductPage() {
    const router = useRouter();
    const { id } = router.query;

    const { data: product, dataError, dataLoading } = useFetch({
        address: id ? `http://localhost:5000/api/products/${id}` : null,
        hasToken: false,
    });

    if (dataLoading) return <p>Loading product...</p>;
    if (dataError) return <p className={styles.error}>{dataError}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className={styles.pageContainer}>
            <ProductDesc product={product}/>
            <div className={styles.imageWrapper} >
                {product.image ? (
                    <img src={product.image} alt={name}  className={styles.image}/>
                ) : (
                    <div className={styles.imagePlaceholder}></div>
                )}
            </div>
            <ProductDetails product={product} />
        </div>
    );
}
