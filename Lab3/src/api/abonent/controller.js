const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const url = "mongodb://127.0.0.1:27017";
const dbName = "abonent_db";

const abonentScheme = new Schema({
    tel: Number,
    adress: Object,
    owner: String,
    totalTalkTime: Number
});


mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true});
const Abonent = mongoose.model("abonent", abonentScheme);
    
const task2Controller = {
    // all
    get: (req, res) => {
        console.log("return all objects");
        Abonent.find({}, function (err, docs) {
            if (err)
                res.status(500).send(err);
            else
                res.send(docs);
        });
    },
    // one
    getId: (req, res) => {
        let id = req.params.id;

        if (id) {
           Abonent.findById(id, function (err, docs) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.send(docs);
                }
           });
        } else {
            res.sendStatus(400);
        }
    },
    /*
    // by gender
    get: (req, res) => {
        console.log("return all objects");
        Abonent.find({}, function (err, docs) {
            if (err)
                res.status(500).send(err);
            else
                res.send(docs);
        });
    },
    getByGender: (req, res) => {
        let gender = req.params.gender;

        if (gender) {
            Person.find({}, function (err, docs) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const maxBirthYear = new Date().getFullYear() - (gender == 'Man' ? 65 : 55);
                    res.send(docs.filter(person => person.gender == gender && person.byear <= maxBirthYear));
                }
            })
        } else {
            res.sendStatus(400);
        }
    },
    */

    //filter by total talk time 
    getFiltered: (req, res) => {
    
            console.log("return all objects");
            Abonent.find({}, function (err, docs) {
                if (err)
                    res.status(500).send(err);
                else{
                    //Filter
                    const talkTime = req.query["t"] || 0;
                    res.send(docs.filter(abonent => abonent.totalTalkTime > parseFloat(talkTime) ));
                }         
            });
        },

    // add
    post: (req, res) => {
        console.log(req.body);
        let newAbonent = req.body;

        if (isValid(newAbonent)) {
            const abonent = new Abonent(newAbonent);
            abonent.save(function (err) {
                if (err) {
                    console.log(err)
                    res.send(err.message);
                } else {
                    console.log("saved", abonent);
                    res.send(newAbonent);
                }
                
            });
        } else {
            res.sendStatus(400);
        }
    },
    
    //delete by id
    deleteId: (req, res) => {
        let id = req.params.id;

        if (id) {
            Abonent.findByIdAndDelete(id, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.send(err.message);
                } else {
                    res.send(doc);
                }
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