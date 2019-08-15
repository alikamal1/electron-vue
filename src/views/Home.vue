<template>
  <div>
     <h1>Electron-Vue Todo App</h1>
    <img alt="Electron logo" width="100" src="../assets/logo2.png" />
    <img alt="Vue logo" width="100" src="../assets/logo.png" />
   <hr>
    <TodosList />
    <div class="container">
   <button @click="openAddTodoWin" class="btn btn-info btn-lg btn-block">Add new Todo</button>   </div>
  </div>
</template>

<script>
import TodosList from "../components/TodosList";
import { ipcRenderer } from "electron";

export default {
  name: "home",
  components: {
    TodosList
  },
  methods: {
    openAddTodoWin() {
      ipcRenderer.send("openAddTodoWin");
    }
  }
};
</script>

<style scoped>
button {
  margin-top: 20px;
}
</style>