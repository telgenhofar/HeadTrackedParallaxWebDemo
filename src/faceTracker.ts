import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.0/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const LEFT_IRIS = 468;
const RIGHT_IRIS = 473;

export type Point = { x: number; y: number };

export async function createFaceTracker(video: HTMLVideoElement) {
  const landmarker = await FaceLandmarker.createFromOptions(await FilesetResolver.forVisionTasks(WASM_URL), {
    baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
    runningMode: "VIDEO",
    numFaces: 1,
  });
  let lastVideoTime = -1;

  return function detectIrises(): { left: Point; right: Point } | null {
    if (video.currentTime === lastVideoTime) {
      return null;
    }
    lastVideoTime = video.currentTime;
    const [face] = landmarker.detectForVideo(video, performance.now()).faceLandmarks;
    if (face === undefined) {
      return null;
    }
    const left = face[LEFT_IRIS];
    const right = face[RIGHT_IRIS];
    return {
      left: { x: left.x * video.videoWidth, y: left.y * video.videoHeight },
      right: { x: right.x * video.videoWidth, y: right.y * video.videoHeight },
    };
  };
}
