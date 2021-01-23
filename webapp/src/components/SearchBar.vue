<template>
    <div>
        <img class="icon" src="../assets/search-icon.png" v-on:click="toggleBar">
        <input type="text" v-bind:class="{minimized_view : minimized}">
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    methods: {
        toggleBar() {
            // console.log("X")
            this.minimized = !this.minimized;
        }
    },
    data() {
        return {
            minimized: true
        }
    }
}
</script>

<style scoped>
div {
    display: inline;
    margin: 0 0 0 20px;
    background-color: #eeeeee;
    padding: 5px;
    border-radius: 20px;
}
.minimized_view  {
    display: none;

}
.icon {
    width: 20px;
    height: 20px;
    margin-bottom: -4px;
    cursor: pointer;
}
input {
    margin-left: 5px;
    border-radius: 20px;
    padding: 0 5px 0 5px;
    border: none;
}
</style>
