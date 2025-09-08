export default function AlertBox({ message, onClose,type="info" }) {
    if (!message) return null;

    return (
        <div style={{
            position: "fixed",
            top: "40px",
            right: "20px",
            padding: "16px 24px",
            backgroundColor: type === "error" ? "#BC5D2F" : "#DBBCA7",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000
        }}>
            <span className={"headerText"}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    marginLeft: "20px",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
            >
                ✕
            </button>
        </div>
    );
}
