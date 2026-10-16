import { openCalibrationModal } from "./calibrationModal";

const settingsButton = document.querySelector<HTMLButtonElement>("#settings-button")!;
const fullscreenButton = document.querySelector<HTMLButtonElement>("#fullscreen-button")!;

settingsButton.addEventListener("click", openCalibrationModal);

fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});
