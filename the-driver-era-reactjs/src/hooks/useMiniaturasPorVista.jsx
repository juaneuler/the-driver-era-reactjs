import { useState, useEffect } from "react";

const useMiniaturasPorVista = () => {
    const getCantidad = () => {
        if (window.innerWidth <= 440) return 1;
        if (window.innerWidth <= 650) return 2;
        return 3;
    };
    const [miniaturasPorVista, setMiniaturasPorVista] = useState(getCantidad);

    useEffect(() => {
        const handleResize = () => setMiniaturasPorVista(getCantidad());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return miniaturasPorVista;
};

export default useMiniaturasPorVista;