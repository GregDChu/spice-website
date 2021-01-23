<template>
  <div style="border: 1px solid darkslategrey;">
    <div class="alert-header">
      <h1><b>{{this.author}}</b> | {{this.timestamp}}</h1>
    </div>
    <p>{{this.text}}</p>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    author: String,
    text: String,
    timestamp: String
  }
};
</script>

<style scoped>
div {
  width: 30%;
  display: block;
  background-color: white;
  margin-bottom: 20px;
}
.alert-header{
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 1px;
  padding: 4px;
}
p{
  background-color: #F0F0F0;
  word-wrap: break-word;
  padding: 4px;
}
</style>
