import postscribe from "postscribe";

export default ({ app, store, req }, inject) => {
  const vuePostscribe = async function () {
    return postscribe
  }
  inject("vuePostscribe", vuePostscribe)
}