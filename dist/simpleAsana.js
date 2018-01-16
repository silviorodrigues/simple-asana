let simpleAsana = function() {
  const tasksList = document.getElementById('tasks-list'),
        editPanel = document.getElementById('edit-panel'),
        inputId = document.getElementById('task-id'),
        inputTitle = document.getElementById('task-title'),
        inputDescription = document.getElementById('task-description');

  let init = () => {
    let data = _loadData();

    _renderTasks(data);
  },

  openTask = (taskId=null) => {
    let data = _loadData();
    let taskToEdit = taskId && data.tasks.find((task) => task.id === taskId);

    _clearActiveTasksClass();

    if(taskToEdit) {
      _openPanel(taskToEdit);
      document.getElementById(taskToEdit.id).classList.add('active');
    } else {
      let newTaskId = data.tasks.length ? data.tasks[data.tasks.length-1].id + 1 : 1;

      data.tasks.push({"id": newTaskId, "title": "", "description": ""});

      _openPanel(null, newTaskId);
      _saveData(data);
      _renderNewLine(newTaskId);
    };
  },

  editTask = () => {
    let data = _loadData();
    let id = parseInt(inputId.value);

    data.tasks.map((task) => {
      if(task.id === id) {
        task.title = inputTitle.value;
        task.description = inputDescription.value;
      };
    });

    _saveData(data);
    document.getElementById(id).getElementsByClassName('sa-task-title')[0].innerHTML = inputTitle.value;
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
                    <p class="sa-task-title">${task.title}</p>
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
                    <p class="sa-task-title"></p>
                  </div>
                  <form action="#"><input type="radio"></form>
                </div>
              </div>`;

    tasksList.insertAdjacentHTML('beforeend', newLine);

    let line = document.getElementById(id);

    line.addEventListener('click',  () => openTask(id));
    line.classList.add('active');
  }

  _openPanel = (task=null, id=null) => {
    if(task) {
      inputId.value = task.id;
      inputTitle.value = task.title;
      inputDescription.value = task.description;
    } else {
      inputId.value = id;
      inputTitle.value = '';
      inputDescription.value = '';
    }

    editPanel.classList.add('active');
    inputTitle.focus();
  },

  _clearActiveTasksClass = () => {
    tasksList.childNodes.forEach(task => task.classList.remove('active'));
  };

  return {
    init: init,
    openTask: openTask,
    closePanel: closePanel,
    editTask: editTask
  }
}();