const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Proxy = require('http-proxy').createProxyServer();
const port = process.env.SERVER_PORT;
const app = express();

const ProxyServer= 'http://localhost:'+ process.env.PROXY_PORT;


const io = require('socket.io')(process.env.SERVER_SOCKET, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true,
            "Socket Powered By:":"Emiga Stream https://github.com/eminmuhammadi/emiga-stream.git"
        };
        res.writeHead(200, headers);
        res.end();
    },
    path: '/',
    serveClient: true,
    origins: '*:*',
    cookie: true,
    pingInterval: 1000,
    pingTimeout: 1000,
    upgradeTimeout: 1000,   
    allowUpgrades: true,
    cookie: 'emiga_stream',
    cookiePath:'/',
    cookieHttpOnly:true 
});

let messages = [];

io.on('connection', socket => {
    // console.log(`Socket Conectado: ${socket.id}`);

    // socket.emit('previousMessages',messages);

    // socket.on('sendMessage', data => {
    //     messages.push(data);
    //     socket.broadcast.emit('receivedMessage', data)
    // });

    socket.on('stream',function(data){
        socket.broadcast.emit('stream',data);
    });
    
});

io.of('/stream').clients((error, clients) => {
    if (error) throw error;
      console.log(clients);
});


app.listen(port, () => console.log(`\x1b[40m`,`\x1b[32m`,
`
     _______  __   __  ___   _______  _______ 
    |       ||  |_|  ||   | |       ||   _   |
    |    ___||       ||   | |    ___||  |_|  |
    |   |___ |       ||   | |   | __ |       |
    |    ___||       ||   | |   ||  ||       |
    |   |___ | ||_|| ||   | |   |_| ||   _   |
    |_______||_|   |_||___| |_______||__| |__|
 
    [+] Maintance      : https://github.com/eminmuhammadi/emiga-stream.git
    [+] Server         : http://localhost:${port}
    [+] Socket         : ws://localhost:${process.env.SERVER_SOCKET}
    [~] Running Server...
`,`\x1b[0m`));