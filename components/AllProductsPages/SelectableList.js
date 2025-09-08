import styles from "../../styles/shop.module.css";

export default function SelectableList({
                                           title,
                                           options = [],
                                           selectedOptions = [],
                                           onSelect,
                                       }) {
    const toggleOption = (option) => {
        let updated;
        if (selectedOptions.includes(option)) {
            updated = selectedOptions.filter((o) => o !== option);
        } else {
            updated = [...selectedOptions, option];
        }
        onSelect(updated);
    };

    return (
        <div className={styles.filterBlock}>
            <h3 className={`headerText ${styles.filterSubHeader}`}>{title}</h3>
            <div className={styles.optionList}>
                {options.map((opt, idx) => (
                    <h1
                        key={`${opt}-${idx}`}
                        className={`brandCase ${styles.option} ${
                            selectedOptions.includes(opt) ? styles.selected : ""
                        }`}
                        onClick={() => toggleOption(opt)}
                    >
                        {opt}
                    </h1>
                ))}
            </div>
        </div>
    );
}
