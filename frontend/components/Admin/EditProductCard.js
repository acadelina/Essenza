import styles from "../../styles/admin.module.css";

export default function EditProductCard({brand,name,image,id,onRemove}) {
    const handleRemove = async () => {
        const token = localStorage.getItem("token");
        try {
            const resProd = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!resProd.ok) {
                throw new Error("Failed to remove product");
            }
            onRemove?.(id);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className={styles.editProductCard}>
            <div className={styles.productRow}>
                <img src={image} className={styles.productImage} alt="product"/>
                <div className={styles.productInfo}>
                    <h1 className={`headerText ${styles.brandText}`}>{brand}</h1>
                    <h1 className={`headerText ${styles.nameText}`}>{name}</h1>
                </div>
                <div className={styles.priceRemove}>
                    <img src={"/images/editIcon.png"} className={styles.editBtn} onClick={()=>window.location.href=`editProduct/${id}`} />
                    <img src={"/images/bin.png"} className={styles.removeBtn} onClick={handleRemove} />
                </div>
            </div>
            <div className={styles.divider}></div>
        </div>
    )
}