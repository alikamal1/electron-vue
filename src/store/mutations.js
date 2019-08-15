import {
    ipcRenderer
} from 'electron'
var fs = require('fs')

export default {
    addTodo(state, element) {
        fs.readFile('./src/store/todos.json', 'utf8', (err, data) => {
            if (data != '') {
                let jsonData = JSON.parse(data);
                state.todos = jsonData
            }
            var taskId = 1
            if (state.todos.length > 0) {
                taskId = state.todos[state.todos.length - 1].id + 1
            }
            state.todos.push({
                id: taskId,
                task: element
            })
            fs.writeFile('./src/store/todos.json', JSON.stringify(state.todos), (err) => {
                ipcRenderer.send('closeAddTodoWin')
            })
        })
    },
    refresh(state) {
        fs.readFile('./src/store/todos.json', 'utf8', (err, data) => {
            if (data != '') {
                let jsonData = JSON.parse(data);
                state.todos = jsonData
            }
        })
    },
    removeTodo(state, id) {
        var data = fs.readFileSync('./src/store/todos.json', 'utf8')
            let jsonData = JSON.parse(data);
            state.todos  = jsonData.filter(data => data.id != id)
            fs.writeFileSync('./src/store/todos.json', JSON.stringify(state.todos))
            console.log(state.todos)
    }

}