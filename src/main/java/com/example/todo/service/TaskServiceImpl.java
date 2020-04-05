package com.example.todo.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo.dto.TaskDTO;
import com.example.todo.entity.Task;
import com.example.todo.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository repository;

    @Override
    public List<TaskDTO> getAllTasks(){
        Iterator<Task> itr = repository.findAll().iterator();
        List<TaskDTO> taskList = new ArrayList<>();
        while(itr.hasNext()){
            Task t = itr.next();
            taskList.add(new TaskDTO(t.getTaskId(), t.getTaskName(), (t.getStatus() == (short)1)));
        }
        return taskList;
    }

    @Override
    public int addTask(TaskDTO taskDTO){
        Task task = new Task();
        task.setTaskName(taskDTO.getTaskName());
        task.setStatus((short)0);
        task = repository.save(task);
        return task.getTaskId();
    }

    @Override
    public void toggleStatus(TaskDTO taskDTO){
        Task task = repository.findById(taskDTO.getTaskId()).orElse(null);
        if(task != null){
            task.setStatus((short)((short)1 - task.getStatus()));
            repository.save(task);
        }

    }

    @Override
    public void deleteTask(TaskDTO taskDTO){
        Task task = repository.findById(taskDTO.getTaskId()).orElse(null);
        if (task != null) {
            repository.delete(task);
        }
    }
    
    @Override
    public void clearCompleted() {
    	List<Task> tasks = repository.findTaskByStatus((short)1);
    	if(tasks!=null) {
    		for(Task task : tasks) {
    			repository.delete(task);
    		}
    	}
    }
    
    @Override
    public void completeAll() {
    	 Iterator<Task> itr = repository.findAll().iterator();
         List<TaskDTO> taskList = new ArrayList<>();
         while(itr.hasNext()){
             Task t = itr.next();
             t.setStatus((short)1);
             repository.save(t);
         }
    }

}
