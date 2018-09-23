var fs = require('fs');
var uuid = require('uuid');
var path = require('path')

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.status(200).send({ message: 'Welcome to our restful API' });
    });
    app.get("/v1/formData", function (req, res) {
        fs.readFile('data/form.json', 'utf8', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({"data":obj}));
        });
    });
    app.get("/v1/users", function (req, res) {
        fs.readFile('data/people.json', 'utf8', function (err, data) {
            if (err) throw err;            
            obj = JSON.parse(data);
            // if request contains query parameter(search string), then filter the user data.
            if (req.query.q){
                var peoples = [];
                obj.forEach(element => {
                    str = JSON.stringify(element).toLowerCase()
                    if(str.indexOf(req.query.q.toString().toLowerCase()) >= 0){
                        peoples.push(element)
                    }
                });
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({"data":peoples}));
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({"data":obj}));
            }
        });
    });
    app.post("/v1/users", function (req, res) {
        fs.readFile('data/people.json', 'utf8', function (err, data) {
            if (err) throw err;            
            obj = JSON.parse(data);
            let photoFile = req.files.photo;
            var newPeople = new Object;
            newPeople.username = req.body.username;
            newPeople.email = req.body.email;
            newPeople.age = req.body.age;
            newPeople.gender = req.body.gender;
            newPeople.skill = req.body.skill;
            newPeople.experience = req.body.experience;
            newPeople.field = req.body.field;
            newPeople.photo = uuid.v1() + path.extname(photoFile.name);
            newPeople.description = req.body.description;        
            newfileName ="img/" + newPeople.photo;
            
            fs.writeFile(newfileName, photoFile.data, function(err){
                if (err)throw err
            });
            obj.push(newPeople);
            fs.writeFile("data/people.json", JSON.stringify(obj), function(err) {
                if (err) throw err;   
            });         
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({"data":obj}));
        });
    });

    app.get("/v1/users/:num", function (req, res) {
        var num = req.params.num;
        if (!isFinite(num) || num  < 0 ) {
            res.status(400).send({ message: 'invalid number supplied' });
        }
        else{
             fs.readFile('data/people.json', 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);                
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({"data":obj[num]}));
            });
        }       
    });
}

module.exports = appRouter;