import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "../../styles/shop.module.css";


export default function PriceRange({ onChange, defaultMin = 0, defaultMax = 2000 }) {
    const [range, setRange] = useState([defaultMin, defaultMax]);

    useEffect(() => {
        if (onChange) {
            onChange([range[0], range[1]]);
        }
    }, []);

    const handleChange = (newRange) => {
        setRange(newRange);
        if (onChange) {
            onChange([newRange[0], newRange[1]]);
        }
    };

    return (
        <div className={styles.prBlock}>
            <h3 className={`headerText ${styles.filterSubHeader}`}>
                Price Range
            </h3>
            <div className={styles.sliderWrapper}>
            <Slider
                range
                min={0}
                max={defaultMax}
                step={10}
                value={range}
                onChange={handleChange}
                trackStyle={[{ backgroundColor: '#BC5D2F' }]}
                handleStyle={[{ borderColor: '#BC5D2F' }, { borderColor: '#BC5D2F' }]}
                railStyle={{ backgroundColor: '#e9e9e9', width: "250px", marginLeft: "10px" }}
            /></div>
            <p className={`headerText ${styles.priceText}`}>
                Selected: &nbsp; ${range[0]} - ${range[1]}
            </p>
        </div>
    );
}
