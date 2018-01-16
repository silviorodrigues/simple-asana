let simpleAsana = function() {
  const tasksList = document.getElementById('tasks-list'),
        editPanel = document.getElementById('edit-panel'),
        inputTitle = document.getElementById('task-title'),
        inputDescription = document.getElementById('task-description');

  let init = () => {
    let data = _loadData();

    _renderTasks(data);
  },

  openTask = (taskId=null) => {
    let data = _loadData();
    let taskToEdit = taskId && data.tasks.find((task) => task.id === taskId);

    taskToEdit ? _openPanel(taskToEdit) : _openPanel();
  },

  closePanel = () => {
    editPanel.classList.remove('active');
  };

  //private

  let _loadData = () => {
    let data = localStorage.getItem('simpleAsanaTasks');

    return JSON.parse(data);
  },

  _saveData = (data) => {
    let tasks = JSON.stringify(data);

    localStorage.setItem('simpleAsanaTasks', tasks);
  },

  _renderTasks = (data) => {
    let tasksHTML = data.tasks.map((task) => {
      return `<div class="sa-task-item" id="${task.id}">
                <div class="sa-task-item__content">
                  <div>
                    <img src="./images/check.svg" alt="Check task ${task.title}">
                    <p>${task.title}</p>
                  </div>
                  <form action="#"><input type="radio"></form>
                </div>
              </div>`;
    });

    tasksList.innerHTML = tasksHTML.join('');
  },

  _openPanel = (task=null) => {
    if(task) {
      inputTitle.value = task.title;
      inputDescription.value = task.description;
    } else {
      inputTitle.value = '';
      inputDescription.value = '';
    }

    editPanel.classList.add('active');
  };

  return {
    init: init,
    openTask: openTask,
    closePanel: closePanel
  }
}();