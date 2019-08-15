<template>
    <div class="container">
        <input @keydown.enter="addTodo" v-model="todo" class="form-control form-control-lg" type="text" placeholder="Enter a new Task here">

    </div>
</template>

<script>

export default {
    name: 'AddTodo',
    data() {
        return {
            todo: ''
        }
    },
    methods: {
        addTodo() {
            if(this.todo === '') return
            this.$store.dispatch('addTodo', this.todo)
            this.todo = ''
        }
    }
    
}
</script>

<style scoped>
input {
    margin-top: 40px
}
</style>