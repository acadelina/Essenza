import Link from "next/link";
import Image from "next/image";
import {useCart} from "../../utils/CartContext";
import styles from "../../styles/layout.module.css"
import {useState} from "react";
import useFetch from "../../utils/useFetch";


export default function Header() {
    const {count} = useCart();
    const { data: products = [] } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });

    const productList = Array.isArray(products) ? products : [];
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);


    const filteredProducts = productList.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())||p.brand.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>
                <nav>
                    <div className="dropdown">
                        <Link href={"/allProducts"} className={`headerText ${styles.headerText}`}>Shop</Link>
                        <div className="dropdownContent">
                            <Link href="/allProducts">All Products</Link>
                            <Link href="/wProducts">For Woman</Link>
                            <Link href="/mProducts">For Man</Link>
                        </div>
                        <Image src={"/images/arrowIcon.png"} alt={"icon"} width={12} height={12}></Image>
                    </div>

                    <div className="searchWrapper">
                        <h1 className={`headerText ${styles.headerText2}`}>Search</h1>
                        <Image src="/images/serachIcon2.png" alt="icon" width={13} height={13}/>

                        <div className="searchDropdown">
                            <input type="text" placeholder="Search products..."  value={query}
                                   onChange={(e) => {
                                       setQuery(e.target.value);
                                       setShowDropdown(e.target.value.length > 0);
                                   }}/>
                            {showDropdown && filteredProducts.length > 0 && (
                                <div className={styles.searchDropDown}>
                                    {filteredProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.id}`}
                                            className={styles.searchDropDownContent}
                                            onClick={() => {
                                                setShowDropdown(false);
                                                setQuery("");
                                            }}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                                style={{objectFit:"contain"}}
                                            />
                                            <span>{product.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                <Link href="/" className={`title ${styles.title}`}>ESSENZA</Link>

                <div className={styles.rightSection}>
                    <Link href="/cart">
                        <button className={"cassete"}>Cart ({count})</button>
                    </Link>
                    <Link href="/profile">
                        <Image src={"/images/profileIcon.png"} alt={"icon"} width={30} height={30}/>
                    </Link>
                </div>
            </header>

            <div className={"subheader"}>
                <h1>Free Shipping over $100</h1>
            </div>
        </div>
    );
}