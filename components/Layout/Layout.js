import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/layout.module.css"


export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <main className={styles.mainContent}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
