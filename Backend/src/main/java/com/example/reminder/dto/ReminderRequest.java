package com.example.reminder.dto;

/**
 * DTO de entrada para crear un recordatorio.
 * Recibe {title, dayOfWeek} desde el POST /api/reminders.
 */
public class ReminderRequest {

    private String title;
    private String dayOfWeek;

    public ReminderRequest() {
    }

    public ReminderRequest(String title, String dayOfWeek) {
        this.title = title;
        this.dayOfWeek = dayOfWeek;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
