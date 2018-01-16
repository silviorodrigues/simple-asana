const taskItemClass = document.getElementsByClassName('sa-task-item'),
      newTaskButton = document.getElementById('new-task-button'),
      closePanelButton = document.getElementById('close-panel-button'),
      inputTitle = document.getElementById('task-title'),
      inputDescription = document.getElementById('task-description');

simpleAsana.init();

Array.prototype.slice.call(taskItemClass).map((task) => {
  task.addEventListener('click', (e) => {
    let taskId = e.target.closest('.sa-task-item').id;

    simpleAsana.openTask(parseInt(taskId));
  });
});

newTaskButton.addEventListener('click', () => simpleAsana.openTask());
closePanelButton.addEventListener('click', () => simpleAsana.closePanel());