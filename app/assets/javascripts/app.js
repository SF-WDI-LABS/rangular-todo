angular.module('todoApp', ['ngRoute', 'templates'])
			 .config(config)
	 		 .controller('TodosIndexController', TodosIndexController);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
	  $routeProvider
	    .when('/', {
	      templateUrl: 'todos/index.html',
	      controller: 'TodosIndexController',
				controllerAs: 'todosIndexCtrl'
	    })
	    .otherwise({
	      redirectTo: '/'
	    });

	  $locationProvider.html5Mode({
	    enabled: true,
	    requireBase: false
	  });
	}

TodosIndexController.$inject = ['$http'];
function TodosIndexController($http) {
	var vm = this;

  $http({
    method: 'GET',
    url: '/api/todos'
  }).then(onTodosIndexSuccess, onTodosIndexError)

  function onTodosIndexSuccess(response){
    console.log('here\'s the get all todos response data', response.data);
    vm.todos = response.data;
  }
  function onTodosIndexError(error){
    console.log('there was an error: ', error);
  }

	vm.createTodo = function() {
		$http({
	    method: 'POST',
	    url: '/api/todos',
			data: vm.todo
	  }).then(onTodosPostSuccess, onTodosPostError)

	  function onTodosPostSuccess(response){
	    console.log('here\'s the post todo response data', response.data);
	    vm.todos.unshift(response.data);
	  }
	  function onTodosPostError(error){
	    console.log('there was an error: ', error);
	  }
	}

	vm.updateTodo = function(todo) {
		$http({
	    method: 'PUT',
	    url: '/api/todos/'+todo.id,
			data: todo
	  }).then(onTodosUpdateSuccess, onTodosUpdateError)

	  function onTodosUpdateSuccess(response){
	    console.log('here\'s the put todo response data', response.data);
			todo.editForm = false;
	  }
	  function onTodosUpdateError(error){
	    console.log('there was an error: ', error);
	  }
	}

	vm.markDone = function(todo) {
    todo.done = (todo.done ? false : true);
    vm.updateTodo(todo);
  }

	vm.deleteTodo = function(todo) {
		$http({
	    method: 'DELETE',
	    url: '/api/todos/'+todo.id
	  }).then(onTodosDeleteSuccess, onTodosDeleteError)

	  function onTodosDeleteSuccess(response){
	    console.log('here\'s the delete todo response data', response.data);
	  }
	  function onTodosDeleteError(error){
	    console.log('there was an error: ', error);
	  }
	}
};
