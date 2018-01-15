let simpleAsana = function() {
  const tasksList = document.getElementById('tasks-list');

  let init = function() {
    let data = _loadData();

    _renderTasks(data);
  };

  //private

  let _loadData = () => {
    let data = localStorage.getItem('simpleAsanaTasks');

    return JSON.parse(data);
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
  };

  return {
    init: init
  }
}();

simpleAsana.init();