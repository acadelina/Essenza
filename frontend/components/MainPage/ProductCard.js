import styles from "../../styles/home.module.css"

export default function ProductCard({brand,name,image,price}) {
    return (
        <div className={"productCard"} >

            <div id={"div1"}>
                {image ? (
                    <img src={image} alt={name} className={styles.productImage} />
                ) : (
                    <div className={styles.productPlaceholder}></div>
                )}
            </div>


            <div className={styles.productInfo}>
                <h3 className={styles.productText}>
                    {brand}
                </h3>
                <p className={styles.productText} >
                    {name}
                </p>

                <div>
                    <span >
                        { price === 0 ? "OOS" : price === undefined ? "OOS" : `${price}$`}
                    </span>

                    <button>
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    );
}