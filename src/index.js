const Express=require("express");
const http=require("http");
const WebSocket=require("ws");
const BodyParser=require("body-parser");
const InternalIp=require("internal-ip");
const chalk=require("chalk");

const badgeGenerator=require("./badgeGenerator");

const app=new Express();
const server=http.createServer(app);
const wss=new WebSocket.Server({server: server, path: "/ws"});
wss.broadcast=(data) => {
    wss.clients.forEach((client) => {
        if(client.readyState===WebSocket.OPEN){
            client.send(data);
        }
    });
};

const srvAddr=InternalIp.v4.sync()+":3000";

var hrStack=[];

//use parsers
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.get("/bpm", (req, res) => {
    console.log(new Date()+" GET /bpm");

    res.send(hrStack[hrStack.length-1]);
});

app.get("/:schema?", (req, res) => {
    console.log(new Date()+" GET /");

    var resp=badgeGenerator(req.params.schema, srvAddr, req.query.bpm, req.query.bg, req.query.fg);

    res.send(resp);
});

app.post("/", (req, res) => {
    console.log(chalk.yellow("New HR received: "+req.body.hr));
    hrStack.push(req.body.hr);
    
    //broadcast to clients
    wss.broadcast(JSON.stringify({time: new Date(), hr: req.body.hr}));

    res.send("OK");
});

//start listening
server.listen(3000, () => {
    console.log(chalk.green("Listening on "+srvAddr));
});