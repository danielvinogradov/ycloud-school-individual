const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});

const port = 3000

const util = require('util');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const url = util.format(
    'mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true',
    'user1',
    'db1user1',
    [
        'rc1a-7he6eae2xjars8in.mdb.yandexcloud.net:27018'
    ].join(','),
    'rs01',
    'db1'
)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    replSet: {
        sslCA: fs.readFileSync(
            '/usr/local/share/ca-certificates/Yandex/YandexInternalRootCA.crt')
    }
}


let jsdata = null;

let getItems = async function () {


    await MongoClient.connect(url, options, async function (err, db) {
        const dbo = await db.db("db1");

        let result = [];
        await dbo.collection('points').find({}).forEach(item => result.push(item))

        db.close();
        jsdata = result;
        console.log(jsdata);
    })

}

let postItem = async function (insertData) {
    await MongoClient.connect(url, options, async function (err, db) {
        const dbo = db.db("db1");
        await dbo.collection('points').insertOne(insertData)
        db.close();
    })
}

app.get('/', function (req, res) {
    res.send('haha')
})

app.post('/test', function (req, res) {
    console.log(req.body);
    let data = req.body;
    postItem(req.body);
    res.sendStatus(200);
    getItems();
})


app.get('/jsondata', function (req, res) {
        getItems()

        res.json(jsdata)
    }
)


app.get('/clear', async function (req, res) {
    await MongoClient.connect(url, options, async function (err, db) {
        const dbo = await db.db("db1");

        await dbo.collection('points').deleteMany({});

        db.close();

        getItems();

        res.sendStatus(200)
    })

});

app.listen(port, () => console.log(`Example app listening at port ${port}`))
