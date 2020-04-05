import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos:TaskDTO[];
  newTodo: TaskDTO = new TaskDTO();
  taskId:number;
  taskName:string;
  status:boolean;
  incomplete:number;
  filter:string;
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.taskId=0;
    this.taskName="";
    this.status=false;
    this.filter="all";
    this.todos =[];
    this.getAllTasks();
  }
  getAllTasks():void{
    console.log("hello");
    let url = "http://localhost:8080/";
    this.httpClient.get<TaskDTO[]>(url).subscribe(
      res=>{
        this.todos = res;
        this.incomplete=0;
        this.todos.forEach(i=>{
          if(!i.status)
          {
            this.incomplete++;
          }
        })
      },
      err=>{
          alert('Error in request');
      });
    
  }

  addTask(): void{
    if (this.taskName.trim().length === 0) {
      alert("Please enter the task");
      return;
    }
    if(this.taskName!="")
    {
      this.newTodo={
        taskName : this.taskName,
        status : this.status,
        taskId: 0
      }
      
    }
    let url = "http://localhost:8080/addTask";
    this.httpClient.post<number>(url, this.newTodo).subscribe(
      res=>{
      this.newTodo.taskId = res;
        // location.reload();
      },
      err=>{
          alert('Error in request');
      }
    )
    this.taskName="";
    this.todos.push(this.newTodo)
    
  }
  deleteTodo(delTask: TaskDTO){
    this.todos.splice(this.todos.indexOf(delTask),1);
    let url = "http://localhost:8080/deleteTask";
    this.httpClient.post(url, delTask).subscribe(
      res=>{
        // location.reload();
      },
      err=>{
          alert('Error in request');
      }
    );
  }
  toggleStatus(toggleTask: TaskDTO)
  {
    toggleTask.status=!toggleTask.status
    this.incomplete=0;
    this.todos.forEach(i=>{
      console.log(i.taskName);
      if(!i.status)
      {
        this.incomplete++;
      }
    })
    let url = "http://localhost:8080/toggleStatus";
    this.httpClient.post(url, toggleTask).subscribe(
      res=>{
        // location.reload();
      },
      err=>{
          alert('Error in request');
      }
    )
  }
  clearCompleted():void{
    let url = "http://localhost:8080/clearCompleted";
    this.httpClient.get(url).subscribe(
      res=>{
        let todotemp: TaskDTO[]=[];
        this.todos.forEach(taskDTO=>{
          if(!taskDTO.status){
           todotemp.push(taskDTO);
          }
        });
        this.todos = todotemp;
      //  location.reload();
      },
      err=>{
          alert('Error in request');
      }
    )
    
  }
 checkAllTodos():void{
  let url = "http://localhost:8080/completeAll";
  this.httpClient.get(url).subscribe(
    res=>{
    },
    err=>{
        alert('Error in request');
    }
  )
   this.todos.forEach(taskDTO=>{
      taskDTO.status=true;
   })
   this.incomplete=0;
 }
  todosFiltered(): TaskDTO[] {
    if (this.filter === "all") {
      return this.todos;
    } else if (this.filter === "active") {
      return this.todos.filter(todo => !todo.status);
    } else if (this.filter === "completed") {
      return this.todos.filter(todo => todo.status);
    }
    return this.todos;
  }
}
export class TaskDTO {
  taskId: number;
  taskName: string;
  status: boolean;
  // todos:TaskDTO[];
}


