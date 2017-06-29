(function lookForCompletedTasks() {
  var todos = document.querySelectorAll(".needToDo");
  for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener("click", function() {
      var clickedTodo = this.innerHTML;
      axios
        .post("/complete", {
          completed: clickedTodo
        })
        .then(function(response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
})();

(function lookForIncompleteTasks() {
  var unDoneTodos = document.querySelectorAll(".completed");
  for (let i = 0; i < unDoneTodos.length; i++) {
    unDoneTodos[i].addEventListener("click", function() {
      var clickedTodo = this.innerHTML;
      axios
        .post("/undone", {
          completed: clickedTodo
        })
        .then(function(response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
})();
