package com.example.reminder.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.reminder.dto.ReminderRequest;
import com.example.reminder.entity.Reminder;
import com.example.reminder.service.ReminderService;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

	private final ReminderService reminderService;

	public ReminderController(ReminderService reminderService) {
		this.reminderService = reminderService;
	}

	@GetMapping
	public List<Reminder> getAll() {
		return reminderService.findAll();
	}

	@PostMapping
	public ResponseEntity<Reminder> create(@RequestBody ReminderRequest request) {
		Reminder created = reminderService.create(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}
}
