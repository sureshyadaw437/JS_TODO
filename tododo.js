(function() {
    var Task = (function() {
        var Task = function(value, completed, removed) {
            this.value = value;
            this.completed = completed;
            this.removed = removed;
        }
        return Task;
    })();

    var Page = (function() {
        var Page = function() {
            this.tasks = [];
        }

        Page.prototype.show = function() {
            var events = new Events(this);

            var mainDiv = document.getElementById("mainPage");
            mainDiv.innerHTML = "";
            appendAddFunctionality(mainDiv, events);

            var statusDiv = getProgressBar(this.tasks);
            mainDiv.appendChild(statusDiv);

            var pendingTasksDiv = document.createElement('div');
            var pendingTasksHeading = document.createElement('p');
            pendingTasksHeading.innerHTML = "<b> Pending Tasks </b>";
            pendingTasksDiv.appendChild(pendingTasksHeading);

            var completedTasksDiv = document.createElement('div');
            var completedTasksHeading = document.createElement('p');
            completedTasksHeading.innerHTML = "<b> Completed Tasks </b>";
            completedTasksDiv.appendChild(completedTasksHeading)


            mainDiv.appendChild(pendingTasksDiv);
            mainDiv.appendChild(completedTasksDiv);
            for (var i = 0; i < this.tasks.length; i++) {
                var task = this.tasks[i];
                showTasks(task, pendingTasksDiv, completedTasksDiv, events, i);
            }

        }

        function getProgressBar(tasks) {
            var statusDiv = document.createElement('div');
            var completedTasksPercentage = getPercentage(tasks);
            var statusLabel = document.createElement('label');
            statusLabel.innerHTML = "Completed Tasks Percentage : "
            var progressBar = document.createElement('progress');
            progressBar.value = completedTasksPercentage;
            progressBar.max = "100";
            statusDiv.appendChild(statusLabel);
            statusDiv.appendChild(progressBar);
            statusDiv.classList.add('statusDiv');
            return statusDiv;
        }

        function appendAddFunctionality(mainDiv, events) {
            var addFunctionalityDiv = document.createElement('div');
            mainDiv.appendChild(addFunctionalityDiv);
            var inputAddTextBox = document.createElement('input');
            inputAddTextBox.type = "text";
            var addButton = document.createElement('button');
            addButton.innerHTML = "Add";
            addFunctionalityDiv.appendChild(inputAddTextBox);
            addFunctionalityDiv.appendChild(addButton);
            inputAddTextBox.addEventListener('change', events.TextBoxChange);
            addButton.addEventListener('click', events.Add);
        }

        function showTasks(task, pendingTasksDiv, completedTasksDiv, events, tasknumber) {
            if (!task.removed) {
                var taksdiv = document.createElement('div');
                var child = document.createElement('label');
                child.innerText = task.value;
                var removehref = document.createElement('a');
                removehref.value = task.value;
                removehref.innerHTML = 'Remove';
                removehref.title = 'Click to remove the task';
                removehref.style.cursor = 'pointer';
                removehref.addEventListener('click', function() {
                    events.removed(tasknumber)
                });
                if (task.completed) {
                    child.classList.add('tasksCompleted');
                    taksdiv.appendChild(child);
                    completedTasksDiv.appendChild(taksdiv);
                    taksdiv.appendChild(removehref);
                } else {
                    child.classList.add('tasksPending');
                    var taskCheckmark = document.createElement('input');
                    taskCheckmark.type = 'checkbox';
                    taskCheckmark.value = task.value;
                    taskCheckmark.title = "Click me Complete";
                    taskCheckmark.addEventListener('change', function() {
                        events.completed(tasknumber)
                    });

                    pendingTasksDiv.appendChild(taksdiv);
                    taksdiv.appendChild(taskCheckmark);
                    taksdiv.appendChild(child);
                    taksdiv.appendChild(removehref);
                }
            }
        }

        function getPercentage(tasks) {
            var completedTasks = 0;
            var length = 0;
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                if ((!task.removed)) {
                    if (task.completed) {
                        completedTasks++;
                    }
                    length++;
                }

            }
            var percentage = (completedTasks / length) * 100;
            if (length == 0) {
                percentage = 0;
            }
            return percentage;
        }
        return Page;
    })();

    var Events = (function() {
        var textboxValue = "";
        var page = "";
        var Events = function(Page) {
            page = Page;
        }
        Events.prototype.TextBoxChange = function(e) {
            textboxValue = e.target.value;
        }
        Events.prototype.Add = function(e) {
            for (var index = 0; index < page.tasks.length; index++) {
                var task = page.tasks[index];
                if (task.value === textboxValue && !(task.removed)) {
                    alert("Another task with name " + textboxValue + "  already existing");
                    return;
                } else if (task.value === textboxValue && task.removed) {
                    task.removed = false;
                    task.completed = false;
                    page.show();
                    return;
                }
            }
            addToTasks(textboxValue);
        }
        Events.prototype.completed = function(e) {
            var task = page.tasks[e];
            task.completed = true;
            page.show();
        }
        Events.prototype.removed = function(e) {
            var task = page.tasks[e];
            task.removed = true;
            page.show();
        }

        function addToTasks(value) {
            var task = new Task(value, false, false);
            page.tasks.push(task);
            page.show();
        }
        return Events;
    })();

    var page = new Page();
    page.show();
})();