const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const url = "mongodb://127.0.0.1:27017";
const dbName = "account_db";

const accountScheme = new Schema({
    login : String,
    password : String,
    passwordAgain : String,
    isLoggedIn : {
        type : Boolean,
        default : false
    }
});


mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true});
const Account = mongoose.model("account", accountScheme);
    
const accountController = {
    // all
    get: (req, res) => {
        console.log("Return all objects");
        Account.find({}, function (err, docs) {
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
           Account.findById(id, function (err, docs) {
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
    //logging in
    logIn: (req, res) => {
        let user= new Account(req.body);

        Account.findOne({ login: user.login, password: user.password }).then(inf => {
            if (!inf) {
                return res.status(401).send("Check your password or login").status(304)
            }
            if (inf.isLoggedIn) {
                return res.status(401).send("This user is already logged in");
            }
            const updatedUser = { login: user.login, password: user.password, isLoggedIn: true };
            Account.findOneAndUpdate({ login: user.login, password: user.password }, updatedUser, { new: true }, function (error, user) {
                if (error) {
                    return res.send(error);
                }
                else {
                    return res.send(user);
                }
            });
        });
    },

    // logging out
    logOut: (req, res) => {
        let user= new Account(req.body);

        Account.findOne({ login: user.login, password: user.password }).then(inf => {
            if (!inf) {
                return res.status(401).send("Check your password or login").status(401)
            }
            if (!inf.isLoggedIn) {
                return res.status(401).send("This user is already logged out");
            }
            const updatedUser = { login: user.login, password: user.password, isLoggedIn: false };
            Account.findOneAndUpdate({ login: user.login, password: user.password }, updatedUser, { new: true }, function (error, user) {
                if (error) {
                    return res.send(error)
                }
                else {
                    return res.send(user);
                }
            });
        });
    },


    // add
    post: (req, res) => {
        console.log(req.body);
        let newAccount = req.body;
        if (newAccount) {
            const account = new Account(newAccount);
            account.validate(function (err) {
                if (err) {
                    console.log(err)
                    res.send(err.message);
                }
                
                else {
                    
                    if ( account.password == account.passwordAgain) {
                        if (account.login.length > 4) {
                            if (account.password.length > 4) {
                                account.save()
                                console.log("saved", account);
                                res.send(newAccount);
                                }
                            else {                            
                                res.send("Password must consists more than 4 characters.")
                            }
                        }
                        else {
                            res.send("Login must consists more than 4 characters.")
                        } 
                    }
                    else {
                        res.send("Passwords don't match.")
                    }        
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
            Account.findByIdAndDelete(id, function (err, doc) {
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

//{login : String, password : String, passwordAgain : String, isLoggedIn : { type : Boolean, default : false }}
const isValid = (account) => {
    return account && account.login && account.password && account.passwordAgain && account.isLoggedIn;
}

module.exports = {
    accountController
};