export default {
    addTodo(context, element) {
        context.commit('addTodo', element)
    },
    refresh(context) {
        context.commit('refresh')
    },
    removeTodo(context, element) {
        context.commit('removeTodo', element)
    }
}