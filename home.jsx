<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Document</title>
        </head>
        <body>
            <form action="/info/get" method="GET">
                <input type="submit" value="GET"/>
            </form>
            <form action="/info/add" method="POST">
                <label for="add">ADD: </label>
                <input type="text" name="add" id="add"/>
                <input type="submit" value="ADD"/>
            </form>
            <form action="/info/delete" method="POST">
                <label for="delete">Delete: </label>
                <input type="text" name="delete" id="delete"/>
                <input type="submit" value="DELETE"/>
            </form>
            <form action="/info/update" method="POST">
                <label for="oldValue">Old value: </label>
                <input type="text" name="oldValue" id="oldValue"/>
                <input type="submit" value="DELETE"/>
                <label for="delete">New value: </label>
                <input type="text" name="newValue" id="newValue"/>
                <input type="submit" value="UPDATE"/>
            </form>
        </body>
        </html>