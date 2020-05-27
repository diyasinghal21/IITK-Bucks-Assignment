## Assignment6

### Installing dependencies

Run the following command in terminal

```
npm install
```

### ngrok installation

firstly download the zip file of ngrok from net and then extract it.

```
https://ngrok.com/download
```

then copy .ngrok file in the current directory

and run the following commands in terminal:

```
chmod +x ./ngrok

./ngrok http 5000

```

### Running the server

run the command in terminal

```
node index.js
```

### Add peers

To add peers url add them in `peers.json` file and then the request will be send to all the peers.

## Sending the request

We have two api endpoints `/add` and `/list`.
for `\add` send a `post` request along with the body in the following format at postman on url `http://localhost:5000/add`.

```
{
    "key":"name of key",
    "value":"value",
}
```

for `\list` send a `get` request at postman on url
`http://localhost:5000/list`
