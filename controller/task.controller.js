const Task = require('../schema/task.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var secretKey = 'key';


exports.create = (req, res) => {
    // console.log(req.body.password);
    // let hash = bcrypt.hashSync(req.body.password, saltRounds);
    // req.body.password = hash;
    // // bcrypt.compareSync(myPlaintextPassword, hash); //
    console.log('####################', req.body)
    ;    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "user can not be empty"
        });
    }

    // Create a user
    const task = new Task({
        Task: req.body.task,
        description: req.body.description,
    });

    // Save user in the database
    task.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

exports.getTask = (req,res) => {
    Task.findAll({}).then((postData)=>{
        console.log(postData);
    })
};
// exports.login = (req, res) => {
//     console.log('req.params', req.body);
//     User.findOne({'email': req.body.email})
//         .then(user => {
//             if(!user) {
//                 return res.status(404).send({
//                     message: "User not found with email " + req.body.email
//                 });
//             }
//             let hash = bcrypt.compareSync(req.body.password, user.password);
//             if (hash) {
//                 var token = jwt.sign({ email: user.email }, secretKey, {
//                     expiresIn: 86400 // expires in 24 hours
//                 });
//
//                 res.status(200).send({ message: 'Login Successfully', result: true, token: token});
//             } else {
//                 res.status(400).send({ message: 'Password In Correct', result: false });
//             }        }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.body.email
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with id " + req.body.email
//         });
//     });
// };