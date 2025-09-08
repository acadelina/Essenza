import Link from "next/link";
import Image from "next/image";
import {useCart} from "../../utils/CartContext";
import styles from "../../styles/layout.module.css"


export default function Header() {
    const {count} = useCart();
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
                            <input type="text" placeholder="Search products..."/>
                            <button>GO</button>
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