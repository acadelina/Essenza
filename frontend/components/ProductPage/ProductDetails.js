import styles from '../../styles/product.module.css';

export default function ProductDetails({product}) {

    const notes = product.notes.split(", ");
    return (
        <div className={styles.detailsContainer}>
            <h1 className={`headerText ${styles.detailsHeader}`}>DETAILS</h1>
            <div className={styles.line}></div>
            <h1 className={`headerText ${styles.subHeader}`}>Description</h1>
            <div className={styles.description}>
                {product.description}

            </div>
            <h1 className={`headerText ${styles.subHeader}`}>Notes</h1>
            <div className={styles.notes}>
                {notes.map((note, index) => (
                    <div className={`brandCase ${styles.note}`} key={index}>{note}</div>
                ))}
            </div>
        </div>
    )

}