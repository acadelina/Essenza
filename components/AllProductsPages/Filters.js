import PriceRange from "./PriceRange";
import SelectableList from "./SelectableList";
import styles from "../../styles/shop.module.css";


export default function Filters({
                                    brands,
                                    notes,
                                    onBrandSelect,
                                    onNotesSelect,
                                    onPriceChange,
                                    selectedBrands = [],
                                    selectedNotes = [],
                                    priceRange = [0, 2000]
                                }) {
    return (
        <div className={styles.filtersSection}>
            <h1 className={`headerText ${styles.filtersHeader}`}>
                FILTERS
            </h1>
            <PriceRange onChange={onPriceChange} value={priceRange}/>
            <div className={styles.divider}></div>
            <SelectableList
                title="Brands"
                options={brands}
                selectedOptions={selectedBrands}
                onSelect={onBrandSelect}
            />

            <SelectableList
                title="Notes"
                options={notes}
                selectedOptions={selectedNotes}
                onSelect={onNotesSelect}
            />

        </div>
    );
}
