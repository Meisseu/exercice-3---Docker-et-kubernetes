import { useEffect, useState } from "react";

function Message() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Erreur API:", err));
    }, []);

    return (
        <div>
            <h2>Produits</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Message;
