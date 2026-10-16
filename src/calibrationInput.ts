import { metersPerPixel, type Unit } from "./screenSize";

const diagonalInput = document.querySelector<HTMLInputElement>("#diagonal")!;
const unitSelect = document.querySelector<HTMLSelectElement>("#unit")!;

export function onCalibrationChange(callback: (metersPerPixel: number) => void) {
    const update = () => {
        const diagonal = Number(diagonalInput.value);
        if (diagonal > 0) {
            callback(metersPerPixel(diagonal, unitSelect.value as Unit));
        }
    };
    diagonalInput.addEventListener("input", update);
    unitSelect.addEventListener("change", update);
    update();
}