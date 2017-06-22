(function lookForCompletedTasks() {
  var todos = document.querySelectorAll(".needToDo");
  for (let i = 0; i < todos.length; i++) {
    todos[i].addEventListener("click", function() {
        removeToDo(todos[i]);
      addToFinishedDiv(todos[i]);
    });
  }
})();

function addToFinishedDiv(el) {
  var finished = document.querySelector(".finished");
  var p = document.createElement("p");
  p.innerHTML = el.innerHTML;
  p.classList.add("completed");
  finished.appendChild(p);
}


function removeToDo (el) {
    el.classList.add("fadeOut");
    setTimeout(function(){el.remove()}, 1000);
}