export async function startWebcam() {
  const video = document.createElement("video");
  video.srcObject = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720, facingMode: "user" },
  });
  video.playsInline = true;
  await video.play();
  return video;
}
