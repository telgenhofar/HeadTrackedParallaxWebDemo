function smoothingFactor(cutoff: number, dt: number) {
  const tau = 1 / (2 * Math.PI * cutoff);
  return 1 / (1 + tau / dt);
}

export class OneEuroFilter {
  private previousValue: number | null = null;
  private previousDerivative = 0;
  private previousTime = 0;

  minCutoff = 1;
  beta = 5;
  derivativeCutoff = 1;

  filter(value: number, time: number) {
    if (this.previousValue === null) {
      this.previousValue = value;
      this.previousTime = time;
      return value;
    }
    const dt = Math.max(time - this.previousTime, 1e-3);
    const rawDerivative = (value - this.previousValue) / dt;
    const a = smoothingFactor(this.derivativeCutoff, dt);
    this.previousDerivative = a * rawDerivative + (1 - a) * this.previousDerivative;
    const cutoff = this.minCutoff + this.beta * Math.abs(this.previousDerivative);
    const b = smoothingFactor(cutoff, dt);
    this.previousValue = b * value + (1 - b) * this.previousValue;
    this.previousTime = time;
    return this.previousValue;
  }
}
