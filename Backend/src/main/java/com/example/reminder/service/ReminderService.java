package com.example.reminder.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.reminder.dto.ReminderRequest;
import com.example.reminder.entity.Reminder;
import com.example.reminder.repository.ReminderRepository;

@Service
public class ReminderService {

	private final ReminderRepository reminderRepository;

	public ReminderService(ReminderRepository reminderRepository) {
		this.reminderRepository = reminderRepository;
	}

	public List<Reminder> findAll() {
		return reminderRepository.findAll();
	}

	public Reminder create(ReminderRequest request) {
		Reminder reminder = new Reminder(request.getTitle(), request.getDayOfWeek());
		return reminderRepository.save(reminder);
	}
}
