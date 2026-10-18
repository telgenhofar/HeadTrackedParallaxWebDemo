export const METERS_PER_UNIT = { in: 0.0254, cm: 0.01 };

export type Unit = keyof typeof METERS_PER_UNIT;

export function metersPerPixel(diagonal: number, unit: Unit) {
    return (diagonal * METERS_PER_UNIT[unit]) / Math.hypot(screen.width, screen.height);
}