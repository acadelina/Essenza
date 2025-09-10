import {useState} from "react";
import styles from "../../styles/admin.module.css"
import AlertBox from "../../components/AlertBox";

export default function addProduct() {

    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        brand: "",
        sex: "",
        description: "",
        notes: "",
        image: "",
    });

    const [variants, setVariants] = useState([
        {volume: "", price: "", stock: ""},
    ]);

    const handleProductChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    };

    const handleVariantChange = (index, e) => {
        const newVariants = [...variants];
        newVariants[index][e.target.name] = e.target.value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, {volume: "", price: "", stock: ""}]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        const res = await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({product, variants}),
        });

        if (res.ok) {
            const data= await res.json();
            setInfo(data.message);
            setProduct({
                name: "",
                brand: "",
                sex: "",
                description: "",
                notes: "",
                image: "",
            });
            setVariants([{volume: "", price: "", stock: ""}]);
        } else {
            const data= await res.json();
            setError(data.error);
        }
    };

    return (
        <div className={styles.pageLayout}>
            <h1 className={`headerText ${styles.bigHeader}`}>ADD NEW PRODUCT</h1>
            <div className={styles.darkLine}/>
            <form  onSubmit={handleSubmit}>
                <div className={styles.grid}>
                <div>
                    <p className={"headerText"}>Name:</p>
                    <input
                        className={"brandCase"}
                        name="name"
                        placeholder="Product's name"
                        value={product.name}
                        onChange={handleProductChange}
                        required
                    />
                </div>
                <div>
                    <p className={"headerText"}>Brand:</p>
                    <input
                        className={"brandCase"}
                        name="brand"
                        placeholder="Product's brand"
                        value={product.brand}
                        onChange={handleProductChange}
                        required
                    />
                </div>
                <div>
                    <p className={"headerText"}>Sex:</p>
                <input
                    className={"brandCase"}
                    name="sex"
                    placeholder="Sex"
                    value={product.sex}
                    onChange={handleProductChange}
                    required
                /></div>
                <div>
                    <p className={"headerText"}>Image:</p>
                <input
                    className={"brandCase"}
                    name="image"
                    placeholder="URL Image"
                    value={product.image}
                    onChange={handleProductChange}
                    required
                /> </div>
                <div>
                    <p className={"headerText"}>Description:</p>
                <textarea
                    className={"brandCase"}
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleProductChange}
                /></div>

                <div>
                    <p className={"headerText"}>Notes:</p>
                <textarea
                    className={"brandCase"}
                    name="notes"
                    placeholder="Notes (write them separated by spaces)"
                    value={product.notes}
                    onChange={handleProductChange}
                /></div>
        </div>
                <h2 className={"headerText"}>Options</h2>
                {variants.map((variant, index) => (
                    <div
                        key={index}
                        className={styles.optionsWrapper}
                    >
                        <input
                            className={"brandCase"}
                            type="number"
                            name="volume"
                            placeholder="Volume (ml)"
                            value={variant.volume}
                            onChange={(e) => handleVariantChange(index, e)}
                            required
                        />
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
                        <input
                            className={"brandCase"}
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={variant.stock}
                            onChange={(e) => handleVariantChange(index, e)}
                        />
                        <button className={`cassete ${styles.button}`} type="button" onClick={() => removeVariant(index)}>
                            Remove option
                        </button>
                    </div>
                ))}
                <button className={`cassete ${styles.button}`} type="button" onClick={addVariant}>
                    + Add option
                </button>
                <br/>
                <div className={styles.saveButtonWrapper}>
                    <button className={`cassete `} type="submit">SAVE</button>
                </div>
            </form>
            <AlertBox message={info} onClose={() => setInfo(null)}/>
            <AlertBox message={error} onClose={() => setError(null)}/>
        </div>
    );
}