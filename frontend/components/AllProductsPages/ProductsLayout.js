import ProductCard2 from "./ProductCard2";
import Link from "next/link";

export default function ProductsLayout({products}) {

    return (
        <div className={"productsSection"}>
            {(products || []).map((product) => (
                <Link
                    key={product.id}
                    href={'/product/' + product.id}
                    style={{ textDecoration: 'none' }}
                >
                <ProductCard2
                    key={product.id}
                    brand={product.brand}
                    name={product.name}
                    price={product.minPrice}
                    image={product.image}
                /></Link>
            ))}

        </div>
    )
}