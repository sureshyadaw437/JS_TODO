var Task = (function () {
	var Task = function (value,removed,completed){
		this.value = value;
		this.removed = removed;
		this.completed = completed
		}
		return Task;
})();



var Page = (function (){
	var Page = function(){
		this.tasks = [];
	}
	
	var createNewTaskElement = function(taskString) {
	  //Create List Item
	  var listItem = document.createElement("li");
	  //input (checkbox)
	  var checkBoxComplete = document.createElement("input"); // checkbox
	  //label
	  var label = document.createElement("label");  
	  //button.delete
	  var removeButton = document.createElement("button");  
	  //Each element needs modifying  
	  checkBoxComplete.type = "checkbox"; 
	  removeButton.innerText = "Delete";
	  removeButton.className = "delete";  
	  label.innerText = taskString;  
	  
	   // removeButton.addEventListener('click',removeTaskFromPage());
	   // checkBoxComplete.addEventListener('click', checkBoxTaskComplete());  
	  // each element needs appending
	  listItem.appendChild(checkBoxComplete);
	  listItem.appendChild(label); 
	  listItem.appendChild(removeButton);

	  return listItem;
	}
	Page.prototype.show = function () {
		var maindiv = document.getElementById('maindiv');
		maindiv.innerHTML = '';
		showAddTasks(maindiv,this);
		var completedTasksDiv = document.createElement('div');
		completedTasksDiv.classList.add('completedTasksClass');
		var pendingTasksDiv = document.createElement('div');
		pendingTasksDiv.classList.add('pendingTasksClass');
		showTasks(maindiv,completedTasksDiv,pendingTasksDiv,this.tasks);
		
	}
	
	function showTasks(maindiv,completedTasksDiv,pendingTasksDiv,tasks){
		var incompleteTasksCount =0;  
		var completedTasksCount = 0;
			for(var i = 0; i < tasks.length; i++){
				var task = tasks[i];
				if(!task.removed){
					 
					if(task.completed){
						completedTasksDiv.appendChild(createNewTaskElement(task.value));
						maindiv.appendChild(completedTasksDiv);
						completedTasksCount++;
					}

					else{
						pendingTasksDiv.appendChild(createNewTaskElement(task.value));
						maindiv.appendChild(pendingTasksDiv);
						incompleteTasksCount++;												
					}
				}
			}
			var width=incompleteTasksCount/(incompleteTasksCount+completedTasksCount)
			if(!isNaN(width) && width!=0){
				var elem = document.getElementById("myBar");
				elem.style.width = width*100 + '%';
				document.getElementById("myBar").innerHTML=elem.style.width+' InComplete Task';				
			} 			
	}
		
	function showAddTasks(maindiv,page){
		var outerAddTasksDiv = document.createElement('div');
		maindiv.appendChild(outerAddTasksDiv);
		var addTextbox = document.createElement('input');
		addTextbox.type = 'text';
		var addButton = document.createElement('button');
		addButton.innerHTML = "+Add";
		var events = new Events(page);
		outerAddTasksDiv.appendChild(addTextbox);
		outerAddTasksDiv.appendChild(addButton);
		addTextbox.addEventListener('change',events.onchangeEvent);
		addButton.addEventListener('click',events.addButtonClick);
	}
	
	return Page;
})();

var Events = (function (){
	var page = undefined;
	var textboxValue = '';
	var removeButtonValue=false;
	var checkBoxCompleteValue=false;
	var Events = function(Page){
		page = Page;
	}
	Events.prototype.onchangeEvent = function(e) {
		textboxValue = e.target.value;		
	}	
		
	Events.prototype.addButtonClick = function() {
		for(var i =0; i < page.tasks.length; i++){
			var task = page.tasks[i];
			if(task.value === textboxValue && !task.removed){
				alert('Add Valid Task....!');
				return;
			}
		}
		addTaskToPage();
	}
	
	 Events.prototype.removeButton = function(e) {
		 removeButtonValue=e.target.checked;
		 //Update Task remove property
		 removeTaskFromPage();
	 }
	
	 Events.prototype.checkBoxComplete = function(e) {
		 checkBoxCompleteValue=e.target.Value;
		 //Update Task Complete property		
			checkBoxTaskComplete();
		 }
	
	function removeTaskFromPage(){ 
		 page.show();
	 }
	
	function checkBoxTaskComplete(){ 
		 page.show();
	 }	
	
	function addTaskToPage(){
		var task = new Task(textboxValue,false,false);
		page.tasks.push(task);
		page.show();
	}
	
	return Events;
})();

var page = new Page();
page.show();