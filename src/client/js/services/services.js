app.service('studentDataService', ['crudService',
    function( crudService) {
        var data = [];
        return {
            getAllStudents: function() {
                return crudService.getAll('students')
                    .then(function(students){
                        console.log(students);
                        return students;
                    })
            },
            addStudent: function(payload) {
                console.log(payload);
                crudService.addOne('students', payload)
                    .then(function(student){
                        console.log(student);
                        return student;
                    })
            }
        }
    }]);
app.service('crudService', ['$http', function($http) {
    var data = [];
    return{
        getAll: function(resource) {
            return $http.get('/' + resource)
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                })
        },
        addOne: function(resource, payload){
            return $http.post('/' + resource, payload)
                .then(function(res){
                    return res;
                })
                .catch(function(err){
                    return err;
                })
        }
    }
}]);