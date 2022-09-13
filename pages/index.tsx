import React, { useEffect, useState } from 'react'
import NewReminder from './components/NewReminder'
import ReminderList from './components/ReminderList'
import Reminder from './models/reminder'
import ReminderService from './services/reminder'

export default function Home() {
  const [reminders, setReminders] = useState<Reminder[]>([])

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = async () => {
    const reminders = await ReminderService.getReminder()
    setReminders(reminders)
  }

  const removeReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  const addReminder = async (title: string) => {
    const newReminder = await ReminderService.addReminder(title)
    setReminders([newReminder, ...reminders])
  }

  return (
    <React.Fragment>
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </React.Fragment>
  )
}
