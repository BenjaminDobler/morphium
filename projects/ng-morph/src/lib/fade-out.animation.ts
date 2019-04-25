export class FadeOutAnimation {
  protected getFromTransformations() {
    return {
      opacity: 1
    };
  }

  protected getToTransformation() {
    return {
      opacity: 0
    };
  }
}
