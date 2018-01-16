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

    if(taskToEdit) {
      _openPanel(taskToEdit)
    } else {
      let newTaskId = data.tasks.length ? data.tasks[data.tasks.length-1].id + 1 : 1;

      data.tasks.push({"id": newTaskId, "title": "", "description": ""});

      _openPanel();
      _saveData(data);
      _renderNewLine(newTaskId);
    }
  },

  closePanel = () => {
    editPanel.classList.remove('active');
  };

  //private

  let _loadData = () => {
    let data = localStorage.getItem('simpleAsanaTasks');

    return data ? JSON.parse(data) : {tasks: []};
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

  _renderNewLine = (id) => {
    let newLine = `<div class="sa-task-item" id="${id}">
                <div class="sa-task-item__content">
                  <div>
                    <img src="./images/check.svg" alt="Check task">
                    <p></p>
                  </div>
                  <form action="#"><input type="radio"></form>
                </div>
              </div>`;

    tasksList.insertAdjacentHTML('beforeend', newLine);
    document.getElementById(id).addEventListener('click',  () => openTask(id));
  }

  _openPanel = (task=null) => {
    if(task) {
      inputTitle.value = task.title;
      inputDescription.value = task.description;
    } else {
      inputTitle.value = '';
      inputDescription.value = '';
    }

    editPanel.classList.add('active');
    inputTitle.focus();
  };

  return {
    init: init,
    openTask: openTask,
    closePanel: closePanel
  }
}();