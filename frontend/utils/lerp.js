/* Imagine a file called Lerp with not even a single transient funcntion... */

export default class lerp {
  lerpHypertan(
    pct = 0.5, // 0 to 1. Progress of the lerp from min to max
    min = 0.0, // Minimum value + the loss from smoothness
    max = 1.0, // Maximum value - the loss from smoothness
    smoothness = 0.5, // Smoothness of the tanh curve, will result in not reaching min or max if near 1. And mode collapse at 0.
    rightSway = 0.5
  ) {
    const theta = (pct / smoothness) - (1 / (rightSway + (2 * smoothness)))
    const tanhexp = Math.tanh(Math.PI * theta)
    const frac = (tanhexp + 1) / 2
    const dy = max - min
    let product = frac * dy + min
    return product
  }
  softPlus(x) {
    return Math.log(Math.exp(x) + 1)
  }
  logSigmoidMaxed(x, max) {
    return (1 / (1 + Math.exp(-x + Math.sqrt(max)))) * max
  }
  buefySizeSwitch(size) {
    switch (size) {
      case 'small' || 'sm' || 'is-small':
        return 'is-small'
      case 'medium' || 'md ' || 'is-medium':
        return 'is-medium'
      case 'large' || 'big' || 'is-big' || 'is-large' || 'lg' || 'bg':
        return 'is-large'
      case 'default' | 'is-default':
        return 'is-default'
      default:
        return 'is-default'
    }
  }
  buefyTypeSwitch(type) {
    switch (type) {
      case 'pri' || 'primary' || 'is-primary' || ' p':
        return 'is-primary'
      case 'light' || 'is-light' || 'l':
        return 'is-light'
      case 'dark' || 'is-dark' || 'd':
        return 'is-dark'
      case 'warning' || 'is-warning' || 'w':
        return 'is-warning'
      case 'warning-light' || 'is-warning-light' || 'is-warning is-light' || 'wl':
        return 'is-warning is-light'
      case 'danger' || 'is-danger' || 'dang':
        return 'is-danger'
      case 'danger-light' || 'is-danger is-light' || 'is-danger-light' || 'dang-light':
        return 'is-danger is-light'
      case 'info' || 'is-info' || 'i':
        return 'is-info'
      case 'success' || 'is-success' || 's':
        return 'is-success'
      case 'success-light' || 'is-success is-light' || 'is-success-light' || 'sl':
        return 'is-success is-light'
      case 'link' || 'is-link' || 'l':
        return 'is-link'
      case 'link' || 'is-link-light' || 'is-link is-light' || 'll':
        return 'is-link is-light'
      case 'ghost' || 'is-ghost' || 'g':
        return 'is-ghost'
      default:
        return 'is-primary'
    }
  }
  whichPageAmIOn(guess) {
    [`${guess.toLowerCase()}`, guess].forEach(element => {
      switch (element) {
        case "people" | "is-people" | "p":
          return "people"
        case "companies" | "companis" | "companiees":
          return "companies"
        case "jobs" | "job":
          return "jobs"
        case "home" | "is-home" | "hoem":
          return "home"
        default:
          return "home"
      }
    });
  }

  approximateDomainSizeAfterTransformationFast(firstQueryParameter, secondQueryParameter, firstTotal) { }
  approximateDomainSizeAfterTransformationFull(firstQueryParameter, secondQueryParameter, firstTotal, data, collection_type) { }
}