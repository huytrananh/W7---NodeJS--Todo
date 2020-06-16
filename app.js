const fs = require('fs') // fs = file system
const yargs = require('yargs')
const chalk = require("chalk") // make color

loadData = () => {
    try{
        const buffer = fs.readFileSync('data.json')
        const data = buffer.toString()
        const dataObj = JSON.parse(data)
        return dataObj
    }catch(err){
        return []
    }
}

saveData = (data) => {
    fs.writeFileSync("data.json", JSON.stringify(data)) // change data from read to write
}

yargs.command({
    command: "list",
    describe: "Listing all todos",
    alias: "l",
    handler: () => { //what we want to do when call yargs.command
        console.log(chalk.yellow.bold.underline("Listing todos"))
        const data = loadData()
        data.forEach(({todo, status}, idx) => {
            console.log(status == true ? chalk.green.bold.underline(`idx: ${idx} todo: ${todo} status: ${status}`) : chalk.red.bold.underline(`idx: ${idx} todo: ${todo} status: ${status}`))
        })
    } 
})

yargs.command({
    command: "complete",
    describe: "complete list",
    alias: "l",
    handler: () => { //what we want to do when call yargs.command
        console.log(chalk.yellow.bold.underline("Complete todos"))
        const data = loadData()
        const filterList = data.filter((elm) => elm.status === true)
        filterList.forEach(({todo, status}, idx) => {
            console.log(chalk.green.bold.underline(`idx: ${idx} todo: ${todo} status: ${status}`))
        })
    } 
})

yargs.command({
    command: "incomplete",
    describe: "Listing all todos",
    alias: "l",
    handler: () => { //what we want to do when call yargs.command
        console.log(chalk.yellow.bold.underline("Incomplete todos"))
        const data = loadData()
        const filterList = data.filter((elm) => elm.status === true)
        filterList.forEach(({todo, status}, idx) => {
            console.log(chalk.red.bold.underline(`idx: ${idx} todo: ${todo} status: ${status}`))
        })
    } 
})

// Add todo 
addTodo = (todo, status) => {
    const data = loadData()
    const newTodo = {todo: todo, status: status}
    data.push(newTodo)
    saveData(data)
}

yargs.command({
    command: "add",
    describe: "Add a new todo",
    builder: {
        todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string",
            alias: "t"
        },
        status:{
            describe: "Status of your todo",
            demandOption: false,
            type: "boolean",
            alias: "s",
            default: false
        },
    },
    handler: ({todo, status}) => {
        addTodo(todo, status)
        console.log(chalk.yellow.bold("Finished"))
    }
})

// delete todo
deleteTodo = (idx) => {
    const data = loadData()
    data.splice(idx,1)
    saveData(data)
}

yargs.command({
    command:"delete",
    describe: "Delete todo",
    builder: {
        idx: {
            describe: "Todo index",
            demandOption: true,
            type: "number",
            alias: "i"
        },
    },
    handler: (idx) => {
        deleteTodo(idx)
    }
})

// delete all Todo list
deleteTodoAll = () => {
    const data = loadData()
    saveData([])
}

yargs.command({
    command:"reset",
    describe: "Delete all of todo",
    handler: () => {
        deleteTodoAll()
    }
    
})
/
yargs.parse()

//To add a new todo:
// 1. Need a command to receive info: todo's body, status
// 2. Need a function to save the data
// 3. Need a function to modify data(adding new obj to the existing array)
