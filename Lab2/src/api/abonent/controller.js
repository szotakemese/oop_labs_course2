const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://127.0.0.1:27017";
const dbName = "abonent_db";
    
const task2Controller = {
    // all
    get: (req, res) => {
        console.log("Get all");
        const mongoClient = new MongoClient(url);
        mongoClient.connect(function (err, result) {
            if (err) res.status(500).send(err);

            const abonent = result.db(dbName).collection("abonent");
            abonent.find().toArray(function (err, result) {
                if (err)
                    res.status(500).send(err);
                else{
                    res.send(result);
                }

                mongoClient.close();
            });
        });
    },

    // one
    getId: (req, res) => {
        let id = req.params.id;

        if (id) {
            const mongoClient = new MongoClient(url);
            mongoClient.connect(function (err, result) {
                if (err) res.status(500).send(err);

                const abonent = result.db(dbName).collection("abonent");
                abonent.findOne({_id: mongodb.ObjectID(id)}, function (err, result) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.send(result);

                    mongoClient.close();
                });
            });
        } else {
            res.sendStatus(500);
        }
    },
    
    // add
    post: (req, res) => {
        console.log(req.body)
        let newAbonent = req.body;

        if (isValid(newAbonent)) {
            const mongoClient = new MongoClient(url);
            mongoClient.connect(function (err, result) {
                if (err) res.status(500).send(err);

                const abonent = result.db(dbName).collection("abonent");
                abonent.insertOne(newAbonent, function (err, result) {
                    if (err) 
                        res.status(500).send(err);
                    else
                        res.send(newAbonent);

                    mongoClient.close();
                });
            });
        } else {
            res.sendStatus(400);
        }
    },

    //filter by total talk time 
    getFiltered: (req, res) => {
    
        console.log("Get filtered collection");
        const mongoClient = new MongoClient(url);
        mongoClient.connect(function (err, result) {
            if (err) res.status(500).send(err);

            const abonent = result.db(dbName).collection("abonent");
            abonent.find().toArray(function (err, result) {
                if (err)
                    res.status(500).send(err);
                else{
                    //Filter
                    const talkTime = req.query["t"] || 0;
                    abonent.find( { totalTalkTime : { $gt: parseFloat(talkTime) } } ).toArray( function (err, result){
                        if (err)
                            res.status(500).send(err);
                        else {
                            res.send(result)
                            console.log(result);
                        }
                    });                      
                }
                mongoClient.close();
            });
        });
    },

    //delete by ID
    deleteId: (req, res) => {
        let id = req.params.id;

        if (id) {
            const mongoClient = new MongoClient(url);
            mongoClient.connect(function (err, result) {
                if (err) res.status(500).send(err);

                const abonent = result.db(dbName).collection("abonent");
                abonent.findOneAndDelete({_id: mongodb.ObjectID(id)}, function (err, result) {
                    if (err) res.status(500).send(err);

                    if (result.value)
                        res.status(200).send(id + " has been deleted.");
                    else
                        res.status(418).send(id + " is not found.");

                    mongoClient.close();                        
                });
            });
        } else {
            res.sendStatus(400);
        }
    }
}

//{tel:123, adress:['','',123], owner:'', totalTalkTime:456}
const isValid = (abonent) => {
    return abonent && abonent.tel && abonent.adress && abonent.owner && abonent.totalTalkTime;
}

module.exports = {
    task2Controller
};


    