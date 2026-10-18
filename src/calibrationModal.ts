const modal = document.querySelector<HTMLDialogElement>("#calibration-modal")!;
const closeButton = document.querySelector<HTMLButtonElement>("#modal-close")!;

export function openCalibrationModal() {
  if (!modal.open) {
    modal.showModal();
  }
}

export function onFirstModalClose(callback: () => void) {
  modal.addEventListener("close", callback, { once: true });
}

closeButton.addEventListener("click", () => modal.close());
openCalibrationModal();
