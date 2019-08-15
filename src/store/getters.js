var fs = require('fs')

export default {
    todos(state) {
        var data = fs.readFileSync('./src/store/todos.json', 'utf8')
        if (data) {
            let jsonData = JSON.parse(data)
            state.todos = jsonData
        }
        return state.todos
    }
}