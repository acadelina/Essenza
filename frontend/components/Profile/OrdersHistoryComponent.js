export default function OrdersHistoryComponent({image, name, volume, quantity, price}) {
    return (
        <div style={{backgroundColor: "#DBBCA7"}}>
            <img
                src={image}
                alt={name}
                style={{width: "40px", height:"40px", objectFit: "contain"}}
            />{" "}
            {name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {volume}ml x {quantity} – $
            {price * quantity}
        </div>
    )
}