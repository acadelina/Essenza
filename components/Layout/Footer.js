import styles from "../../styles/layout.module.css"
import Image from "next/image";


export default function Footer() {
    return (
        <div className={styles.footer}>
            <h1 className={`footertext ${styles.footerText}`} >All rights reserved</h1>
            <div className={styles.footerContent}>
            <div className={styles.contact}>
                <h1 className={"footertext"}>Phone: 0741780504</h1>
                <h1 className={"footertext"} >Mail: essenza@gmail.com</h1>
            </div>
                <div className={styles.social}>
                    <Image src="/images/instaIcon.png" alt="Instagram" width={35} height={35} ></Image>
                    <Image src="/images/fbIcon.png" alt="Facebook" width={35} height={35}></Image>
                </div>
            </div>
        </div>
    )
}