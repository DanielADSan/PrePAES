export function corregirOrtografia(palabra) {
    switch (palabra.toLowerCase()) {
        case "algebra":
            return "Álgebra";
        case "probabilidades":
            return "Probabilidades";
        case "geometria":
            return "Geometría";
        case "numeros":
            return "Números";
        default:
            return palabra;
    }
}
