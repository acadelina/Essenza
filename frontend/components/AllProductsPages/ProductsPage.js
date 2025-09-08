import Filters from "./Filters";
import ProductsLayout from "./ProductsLayout";
import useFetch from "../../utils/useFetch";
import { useState, useMemo } from "react";

export default function ProductsPage({ sex = null }) {
    const { data: products, dataError, dataLoading } = useFetch({
        address: "http://localhost:5000/api/products",
        hasToken: false,
    });

    const [selectedNotes, setSelectedNotes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);


    const filteredBySex = useMemo(() => {
        if (!products || !Array.isArray(products)) return [];
        if (!sex) return products;
        return products.filter((p) => p.sex === sex);
    }, [products, sex]);

    const brands = useMemo(() => {
        return [...new Set(filteredBySex.map(p => p.brand))].filter(Boolean);
    }, [filteredBySex]);

    const notes = useMemo(() => {
        const allNotes = filteredBySex.reduce((acc, product) => {
            if (product.notes && typeof product.notes === "string") {
                acc.push(
                    ...product.notes
                        .split(" ")
                        .map((n) => n.trim())
                        .filter((n) => n.length > 0)
                );
            }
            return acc;
        }, []);
        return [...new Set(allNotes)].sort();
    }, [filteredBySex]);

    const filteredProducts = useMemo(() => {
        return filteredBySex.filter((product) => {
            const inBrand =
                selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const inPrice =
                product.minPrice >= priceRange[0] &&
                product.minPrice <= priceRange[1];

            let inNotes = true;
            if (selectedNotes.length > 0) {
                const productNotes = product.notes
                    ? product.notes
                        .split(" ")
                        .map((note) => note.trim())
                        .filter((note) => note.length > 0)
                    : [];
                inNotes = selectedNotes.some((note) => productNotes.includes(note));
            }

            return inBrand && inPrice && inNotes;
        });
    }, [filteredBySex, selectedBrands, selectedNotes, priceRange]);

    if (dataLoading) return <p>Loading...</p>;
    if (dataError) return <p style={{ color: "#BC5D2F" }}>{dataError}</p>;

    return (
        <div
            className={"productsPageLayout"}
        >
            <Filters
                onBrandSelect={setSelectedBrands}
                onNotesSelect={setSelectedNotes}
                onPriceChange={setPriceRange}
                brands={brands}
                notes={notes}
                selectedBrands={selectedBrands}
                selectedNotes={selectedNotes}
                priceRange={priceRange}
            />
            <ProductsLayout products={filteredProducts} />
        </div>
    );
}
