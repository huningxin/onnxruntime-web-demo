module.exports = {
  presets: [["@vue/app", { useBuiltIns: "entry" }]],
  exclude: [
    /webnn-polyfill/,
    /onnxruntime-web/
  ]
}
