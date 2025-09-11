import styles from "../../styles/shop.module.css";

export default function ProductCard2({brand, name, image, price}) {
    return (
        <div className={"productCard"}>

            <div id={"div1"}>
                {image ? (
                    <img src={image} alt={name} className={styles.productImage}/>
                ) : (
                    <div className={styles.imagePlaceholder}></div>
                )}
            </div>


            <div className={styles.productInfo}>
                <h3 className={styles.productText}>
                    {brand}
                </h3>
                <p className={styles.productText} >
                    {name}
                </p>

                <div className={styles.productDiv}>
                    <span className={styles.productText}>
                        {price} $
                    </span>
                </div>
            </div>
        </div>
    );
}