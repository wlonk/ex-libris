<template>
  <webview
    id="pdf-preview"
    :src="src"
    plugins=true
  ></webview>
</template>

<script>
export default {
  name: 'PdfPreview',
  props: {
    src: {
      type: String
    }
  }
}
</script>

<style>
webview#pdf-preview {
  position: fixed;
  right: 0;
  z-index: 10;
  width: 45vw;
  height: 100vh;
  box-shadow: -5px 0px 25px 0px rgba(0,0,0,0.75);
  background-color: rgb(65, 68, 71);
  border-left: 2px solid rgb(52, 54, 57);

}
</style>
