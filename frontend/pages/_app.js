import Layout from "../components/Layout/Layout";
import { CartProvider } from "../utils/CartContext";
import {useAuth} from "../utils/useAuth";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
    const { user } = useAuth();
    return (
        <CartProvider user={user}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
        </CartProvider>
    );
}
