package com.example.reminder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.reminder.entity.Reminder;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
}
