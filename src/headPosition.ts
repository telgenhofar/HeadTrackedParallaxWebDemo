import type { Point } from "./faceTracker";

export function headPosition(
  left: Point,
  right: Point,
  videoWidth: number,
  videoHeight: number,
  fovDegrees: number,
  distance: number,
) {
  const focalLength = videoWidth / 2 / Math.tan((fovDegrees * Math.PI) / 360);
  const midX = (left.x + right.x) / 2 - videoWidth / 2;
  const midY = (left.y + right.y) / 2 - videoHeight / 2;
  return { x: (-midX * distance) / focalLength, y: (-midY * distance) / focalLength, z: distance };
}
