<template>
  <div class="container">
    <ul class="list-group">
      <button v-for="todo in todos" :key="todo.id" @click="removeTodo(todo.id)" class="list-group-item list-group-item-action list-group-item-info">{{ todo.task }}</button>
    </ul>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "TodosList",
  computed: {
    todos() {
      return this.$store.getters.todos;
    }
  },
  mounted() {
    ipcRenderer.on("refresh", () => {
      this.$store.dispatch('refresh')
    });
  },
  methods: {
    removeTodo(id){
      this.$store.dispatch('removeTodo', id)
      
    }
  },
  
};
</script>


<style scoped>

</style>
