module.exports = {
    "type" : "mongodb",
    "url": "mongodb+srv://user1:explore123!@workshop.ag9bn.mongodb.net/suara-be?retryWrites=true&w=majority",
    "useNewUrlParser": true,
    "synchronize": false,
    "logging": false,
    "entities": [
       "./entity/*.ts",
       "src/entity/*.ts"
    ]
 }