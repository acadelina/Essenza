import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetch from "../../../utils/useFetch";
import styles from "../../../styles/admin.module.css";
import AlertBox from "../../../components/AlertBox";

export default function EditProduct() {
    const router = useRouter();
    const { id } = router.query;

    const [variants, setVariants] = useState([]);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);

    const { data: product, dataError, dataLoading } = useFetch({
        address: id ? `http://localhost:5000/api/products/${id}` : null,
        hasToken: false,
    });

    useEffect(() => {
        if (product && product.variants) {
            setVariants(product.variants);
        }
    }, [product]);

    const handleVariantChange = (index, e) => {
        const newVariants = [...variants];
        newVariants[index][e.target.name] = e.target.value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { volume: "", price: "", stock: "" }]);
    };

    const removeVariant = async (index, variantId) => {
        if (variantId) {
            try {
                console.log(variantId);
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:5000/api/products/${id}/variants/${variantId}`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                });
                if (!res.ok) throw new Error("Failed to delete variant");
            } catch (err) {
                setError(err.message);
                return;
            }
        }
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {"Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({product, variants}),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            setInfo("Variants added successfully");
            const refreshed = await fetch(`http://localhost:5000/api/products/${id}`);
            const refreshedData = await refreshed.json();
            setVariants(refreshedData.variants);
        } catch (err) {
            setError(err.message);
        }
    };

    if (dataLoading) return <p>Loading product...</p>;
    if (dataError) return <p className={styles.error}>{dataError}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>EDIT PRODUCT</h1>
            <div className={styles.darkLine} />

            <form onSubmit={handleSubmit}>
                <div className={styles.editPLayout}>
                    <div className={styles.productInfo} style={{alignItems: "flex-end"}}>
                        <img src={product.image} height={"150px"} alt={"no image"}/>
                    </div>
                    <div className={styles.verticalDivider}/>
                    <div className={styles.productInfo}>
                        <div className={styles.productRow}>
                            <p className={"headerText"}>Name</p>
                            <h1 className={styles.thinTextUpper}>{product.name}</h1>
                        </div>
                        <div className={styles.productRow}>
                            <p className={"headerText"}>Brand</p>
                            <h1 className={styles.thinTextUpper}>{product.brand}</h1>
                        </div>
                        <div className={styles.productRow}>
                            <p className={"headerText"}>Sex</p>
                            <h1 className={styles.thinTextUpper}>{product.sex}</h1>
                        </div>
                    </div>

                </div>

                <h2 className={"headerText"}>Variants</h2>
                {variants.map((variant, index) => (
                    <div key={variant.id || index} className={styles.optionsWrapper}>
                        <div className={styles.productRow}>
                            <p className={styles.thinTextUpper}>VOLUME</p>
                            <input
                            className={"brandCase"}
                            type="number"
                            name="volume"
                            placeholder="Volume (ml)"
                            value={variant.volume}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
                        </div >
                        <div className={styles.productRow}>
                            <p className={styles.thinTextUpper}>PRICE</p>
                            <input
                            className={"brandCase"}
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="Price $"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
                        </div>
                        <div className={styles.productRow}>
                            <p className={styles.thinTextUpper}>STOCK</p>
                            <input
                            className={"brandCase"}
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={variant.stock}
                            onChange={(e) => handleVariantChange(index, e)}
                        />
                        </div>

                        <button
                            className={`cassete ${styles.button}`}
                            type="button"
                            onClick={() => removeVariant(index, variant.id)}
                        >
                            Remove option
                        </button>
                    </div>
                ))}
                <button className={`cassete ${styles.button}`} type="button" onClick={addVariant}>
                    + Add option
                </button>

                <br />
                <div className={styles.saveButtonWrapper}>
                    <button className={`cassete`} type="submit">SAVE</button>
                </div>
            </form>

            <AlertBox message={info} onClose={() => setInfo(null)} />
            <AlertBox message={error} onClose={() => setError(null)} />
        </div>
    );
}
