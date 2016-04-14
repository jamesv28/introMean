var express = require('express');
var router = express.Router();
var Students = require('../models/students');
//GET ALL STUDENTS
router.get('/', function (req, response, next) {
    Students.find({}, function (err, res) {
        console.log(res);
        response.status(200).json({
            status: 'success',
            data: res
        });
    });
});


router.get('/:id', function(req, res, next) {
    var studentID = req.params.id;
    Students.findById(studentID, function(err, student) {
        if(err) {
            return next(err);
        }
        res.status(200).json({
            status: 'success',
            data: student
        });
    });

});

router.put('/:id', function(req, res, next) {
    var studentID = req.params.id;
    Students.findByIdAndUpdate(studentID, req.body, {new: true},
        function(err, student) {
            if(err) {
                return next(err);
            }
            res.status(200).json({
                status: 'success',
                data: student
            });
        });

});
router.post('/', function(req, res, next) {

    var student = Students(req.body);

    student.save(function(error, student){
        res.status(200).json({
            status: 'success',
            data: student
        });
    });

});

router.delete('/:id', function(req, res, next) {
    var studentID = req.params.id;
    Students.findByIdAndRemove(studentID,
        function(err, student) {
            if(err) {
                return next(err);
            }
            res.status(200).json({
                status: 'success',
                data: student
            });
        });

});
module.exports = router;