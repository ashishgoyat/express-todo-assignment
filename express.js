const express = require('express')
const fs = require('fs')
const app = express()
const file = './todos.json'
let todos = []
let count = 1


function readfile() {
    if(!fs.existsSync(file)){
        fs.writeFileSync(file, JSON.stringify([],null,2))
        todos = []
        count = 1
        return
        }

        const data = fs.readFileSync(file,'utf-8').trim();

    if(data === ''){
        todos = []
        count = 1
        writefile()
        return
    }

    try{
        todos = JSON.parse(data);
        if(todos.length === 0){
            count = 1
        }
        else{
            count = Math.max(...todos.map(t => t.id)) + 1;
        }
    }
    catch(error){
        console.error('Invalid JSON is todos. Resetting file.')
        todos = []
        count = 1
        writefile()
    }
}

function writefile() {
    fs.writeFileSync(file,JSON.stringify(todos,null,2));
}

readfile();

app.get('/',function(req,res) {
    let result = ''
    for (let i = 0; i < todos.length; i++) {
        result += `<h1>${todos[i].task}</h1>`
    }
    res.send(result)
    
})
app.post('/',function(req,res) {
    let task = req.query.a
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    todos.push({id:count, task})
    count++
    writefile()
    res.json({message : "task added"})

})
app.put('/',function(req,res) {
    let id = req.query.id
    let task = req.query.task
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const i = todos.findIndex(todo => todo.id == id)
    if(i !== -1){
        todos[i].task = task
        writefile()
        res.json({message : "task updated"})
    }
    else{
        res.status(404).json({error : "task not found"})
    }
})
app.delete('/',function(req,res) {
    let id = req.query.id
    const i = todos.findIndex(todo => todo.id == id)
    if(i !== -1){
        todos.splice(i,1);
        writefile()
        res.json({message : "task deleted"})
    }
    else{
        res.status(404).json({error : "task not found"})
    }
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})