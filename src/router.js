import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddTodo from './components/AddTodo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-todo',
      name: 'add-todo',
      component: AddTodo
    },
 
  ]
})
