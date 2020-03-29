package com.example.todo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.todo.entity.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {
	List<Task> findTaskByStatus(short status);

}
