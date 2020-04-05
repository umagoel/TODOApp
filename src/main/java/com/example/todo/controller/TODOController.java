package com.example.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.dto.TaskDTO;
import com.example.todo.service.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TODOController {
	

    @Autowired
    private TaskService service;

    @GetMapping("/")
    public List<TaskDTO> index(){
        return service.getAllTasks();
    }

    @PostMapping("/toggleStatus")
    public void toggleStatus(@RequestBody TaskDTO taskDTO){
        service.toggleStatus(taskDTO);
    }

    @PostMapping("/deleteTask")
    public void  deleteTask(@RequestBody TaskDTO taskDTO){
        service.deleteTask(taskDTO);
    }

    @PostMapping("/addTask")
    public int addTask(@RequestBody TaskDTO taskDTO){
        return service.addTask(taskDTO);
    }

    @GetMapping("/clearCompleted")
    public void clearCompleted() {
    	service.clearCompleted();
    }
    
    @GetMapping("/completeAll")
    public void completeAll() {
    	service.completeAll();
    }
}
