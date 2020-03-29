package com.example.todo.service;

import java.util.List;

import com.example.todo.dto.TaskDTO;

public interface TaskService {

	List<TaskDTO> getAllTasks();

	void addTask(TaskDTO taskDTO);

	void toggleStatus(TaskDTO taskDTO);

	void deleteTask(TaskDTO taskDTO);

	void clearCompleted();

	void completeAll();
	
}
