const taskItemClass = document.getElementsByClassName('sa-task-item'),
      newTaskButton = document.getElementById('new-task-button');

simpleAsana.init();

Array.prototype.slice.call(taskItemClass).map((task) => {
  task.addEventListener('click', (e) => {
    let taskId = e.target.closest('.sa-task-item').id;

    simpleAsana.editTask(parseInt(taskId));
  });
});

newTaskButton.addEventListener('click', () => simpleAsana.newTask());