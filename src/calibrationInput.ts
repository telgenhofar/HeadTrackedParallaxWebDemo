import { metersPerPixel, METERS_PER_UNIT, type Unit } from "./screenSize";

const diagonalInput = document.querySelector<HTMLInputElement>("#diagonal")!;
const unitSelect = document.querySelector<HTMLSelectElement>("#unit")!;

const fovInput = document.querySelector<HTMLInputElement>("#webcam-fov")!;

export function getWebcamFov() {
    const fov = Number(fovInput.value);
    return fov > 0 && fov < 180 ? fov : 60;
}

const calibrateHeightButton = document.querySelector<HTMLButtonElement>("#calibrate-height")!;

const distanceInput = document.querySelector<HTMLInputElement>("#viewing-distance")!;
const distanceUnitSelect = document.querySelector<HTMLSelectElement>("#distance-unit")!;

export function getViewingDistance() {
    const distance = Number(distanceInput.value);
    return distance > 0 ? distance * METERS_PER_UNIT[distanceUnitSelect.value as Unit] : 0.6;
}

export function onHeightCalibrate(callback: () => void) {
    calibrateHeightButton.addEventListener("click", callback);
}

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