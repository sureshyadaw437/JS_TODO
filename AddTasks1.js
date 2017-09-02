var Task = (function() {
    var Task = function(value, removed, completed) {
        this.value = value;
        this.removed = removed;
        this.completed = completed
    }
    return Task;
})();



var Page = (function() {
    var Page = function() {
        this.tasks = [];
    } 

    Page.prototype.show = function() {
		 
        var events = new Events(this);
        var maindiv = document.getElementById('maindiv');
        var completedTasksCount = 0;
        var removedTasksCount = 0;

        maindiv.innerHTML = '';
        showAddTasks(maindiv, this);
        var completedTasksDiv = document.createElement('div');
        completedTasksDiv.classList.add('completedTasksClass');
        var pendingTasksDiv = document.createElement('div');
        pendingTasksDiv.classList.add('pendingTasksClass');
		var totalTasksCount=this.tasks.length;
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
			if(task.completed && task.removed){
				completedTasksCount--;				
			}
            if (task.completed) {
                completedTasksCount++;
            }
            if (task.removed) {
                removedTasksCount++;
            }			
            showTasks(maindiv, completedTasksDiv, pendingTasksDiv, events, task, i);
        }
        var width = (completedTasksCount) / (totalTasksCount- removedTasksCount)
        if (!isNaN(width) && width != 0) {
            var elem = document.getElementById("myBar");
            elem.style.width = width * 100 + '%';
            document.getElementById("myBar").innerHTML = elem.style.width;

        } else {
            var elem = document.getElementById("myBar");
            elem.style.width = 1 + '%';
            document.getElementById("myBar").innerHTML = elem.style.width;
        }

    }

    function showTasks(maindiv, completedTasksDiv, pendingTasksDiv, events, task, taskID) {


        if (!task.removed) {
            var listItem = document.createElement("li");

            var checkBoxComplete = document.createElement("input"); // checkbox

            var label = document.createElement("label");

            var removeButton = document.createElement("button");
            checkBoxComplete.type = "checkbox";
            label.innerText = task.value;

            removeButton.value = task.value;
            removeButton.innerHTML = 'Delete';
            removeButton.className = "delete";
            removeButton.addEventListener('click', function() {
                events.removeButton(taskID)
            });
            checkBoxComplete.addEventListener('click', function() {
                events.checkBoxComplete(taskID)
            });
            if (task.completed) {
                listItem.appendChild(label);
                listItem.appendChild(removeButton);
                completedTasksDiv.appendChild(listItem);
                maindiv.appendChild(completedTasksDiv);
            } else {
                listItem.appendChild(checkBoxComplete);
                listItem.appendChild(label);
                listItem.appendChild(removeButton);
                pendingTasksDiv.appendChild(listItem);
                maindiv.appendChild(pendingTasksDiv);
            }
        }
    }

    function showAddTasks(maindiv, page) {
        var outerAddTasksDiv = document.createElement('div');
        maindiv.appendChild(outerAddTasksDiv);
        var addTextbox = document.createElement('input');
        addTextbox.type = 'text';
        var addButton = document.createElement('button');
        addButton.innerHTML = "+Add";
        var events = new Events(page);
        outerAddTasksDiv.appendChild(addTextbox);
        outerAddTasksDiv.appendChild(addButton);
        addTextbox.addEventListener('change', events.onchangeEvent);
        addButton.addEventListener('click', events.addButtonClick);
    }

    return Page;
})();

var Events = (function() {
    var page = undefined;
    var textboxValue = '';
    var removeButtonValue = false;
    var checkBoxCompleteValue = false;
    var Events = function(Page) {
        page = Page;
    }
    Events.prototype.onchangeEvent = function(e) {
        textboxValue = e.target.value;
    }

    Events.prototype.addButtonClick = function() {
        for (var i = 0; i < page.tasks.length; i++) {			 
            var task = page.tasks[i];
            if (task.value!= '' && task.value === textboxValue && !task.removed) {
                alert('Add Valid Task....!');
                return;
            }
        }
		if (textboxValue!= ''){
        addTaskToPage();			
		}
    }
    Events.prototype.checkBoxComplete = function(e) {
        var task = page.tasks[e];
        task.completed = true;
        page.show();
    }
    Events.prototype.removeButton = function(e) {
        var task = page.tasks[e];
        task.removed = true;
        page.show();
    }

    function addTaskToPage() {
        var task = new Task(textboxValue, false, false);
        page.tasks.push(task);
        page.show();
    }

    return Events;
})();

var page = new Page();
page.show();