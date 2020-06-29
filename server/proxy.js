const express    = require('express');
const path       = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const storage    = path.join(__dirname,"../"+process.env.PROXY_STORAGE_PATH);
const port       = process.env.PROXY_PORT;
const app        = express();


app.use(express.static(storage));


app.engine('html' , require('ejs').renderFile);
app.set('view engine', 'html');

// app.use('/', (req,res)=> {
//     res.sendFile(path.join(storage+'/index.html'));
// });

app.get('/stream', function (req, res) {
    res.sendFile(path.join(storage+'/stream.html'));
});

app.get('/view', function (req, res) {
    res.sendFile(path.join(storage+'/view.html'));
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
    [+] Proxy Server   : http://localhost:${port}
    [+] Storage Path   : ${storage}
    [~] Running Proxy Server...
`,`\x1b[0m`));