const modal = document.querySelector<HTMLDialogElement>("#calibration-modal")!;
const closeButton = document.querySelector<HTMLButtonElement>("#modal-close")!;

export function openCalibrationModal() {
  if (!modal.open) {
    modal.showModal();
  }
}

closeButton.addEventListener("click", () => modal.close());
openCalibrationModal();
