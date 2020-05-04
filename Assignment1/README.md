# Assignment 1

## Installing the Dependencies

Run the following command in terminal after cloning the repository

```
npm install
```

## Starting the Server

Run the following command

```
node server.js
```

## Sending the request to the server

Follow the steps below:

### Install HTTPie

Run the following command

```
sudo apt install httpie
```

### Sending the request along with string in json format

We are sending the request in json format to the server at `/hash` endpoint on the port `8787`

### Input Data Format

```
{ "data" : "string of your choice"}
```

Run the following command to send the request in same format

```
http -v localhost:8787/hash data="string of your choice"
```

### Response format

The output will be again be in json format as:

```
{ "hash" :"string of your choice concatenated with the lucky number such that sha256 is less than the target" }
```

## Example

### Input

```
http -v localhost:8787/hash data=dryairship
```

### Ouput

```
{ "hash":"dryairship16962"}
```
