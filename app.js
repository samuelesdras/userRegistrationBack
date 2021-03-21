const { response } = require('express');
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors());
const morgan = require('morgan');
const {Pool} = require('pg');
require('dotenv').config();

let pool = new Pool();
const port = process.env.PORT;


app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body>
            <form action="/users/get" method="GET">
                <input type="submit" value="GET"/>
            </form>
            <form action="/users/view" method="GET">
                <label for="add">Select Id: </label>
                <input type="text" name="id" id="id"/>
                <input type="submit" value="GET"/>
            </form>
            <form action="/users/add" method="POST">
                <label for="add">Nome: </label>
                <input type="text" name="name" id="add"/>
                <label for="add">Nascimento: </label>
                <input type="text" name="birthday" id="add"/>
                <label for="add">Foto: </label>
                <input type="text" name="photo" id="add"/>
                <input type="submit" value="ADD"/>
            </form>
            <form action="/users/delete" method="POST">
                <label for="delete">Delete: </label>
                <input type="text" name="delete" id="delete"/>
                <input type="submit" value="DELETE"/>
            </form>
            <form action="/users/update" method="POST">
                <label for="oldName">Old name: </label>
                <input type="text" name="oldName" id="oldName"/>
                <label for="newName">New value: </label>
                <input type="text" name="newName" id="newName"/>
                <input type="submit" value="UPDATE"/>
            </form>
        </body>
        </html>
    `);
});


app.get('/users/get',(req, res) => {
    try{
    pool.connect(async(error, client, release) => {
        let resp = await client.query(`SELECT * FROM users`);
        release();
        res.send(resp.rows);
    })
    }catch(error){
        console.log(error);
    }
})

app.get('/users/view/:id',(req, res) => {
    try{
    pool.connect(async(error, client, release) => {
        const { id } = req.params;
        let resp = await client.query(`SELECT * FROM users WHERE id = ${ id }`);
        release();
        res.send(resp.rows[0]);
    })
    }catch(error){
        console.log(error);
    }
})

app.post('/users/add',(req, res) => {
    try{
    pool.connect(async(error, client, release) => {
        console.log("BODY", req.body)
        const data = req.body;
        let resp = await client.query(
            `INSERT INTO users (name, birthday, photo) 
            VALUES ('${data.name}', '${data.birthday}', '${data.photo}')`
        );
        res.redirect('/users/get')
    })
    }catch(error){
        console.log(error);
    }
})

app.post('/users/delete/:id',(req, res) => {
    try{
    pool.connect(async(error, client, release) => {
        const { id } = req.params;
        let resp = await client.query(`DELETE FROM users WHERE id = '${ id }'`);
        res.redirect('/users/get')
    })
    }catch(error){
        console.log(error);
    }
})

app.post('/users/update/:id',(req, res) => {
    try{
    pool.connect(async(error, client, release) => {
        const { id } = req.params;
        const data = req.body;
        let resp = await client.query(
            `UPDATE users SET name = '${data.name}', birthday = '${data.birthday}', photo = '${data.photo}' WHERE id = ${id}`);
        res.redirect('/users/get')
    })
    }catch(error){
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`server started on ${port}`)
});