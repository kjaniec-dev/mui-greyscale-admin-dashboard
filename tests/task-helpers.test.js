import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getOverdueTasks,
  getTaskStats,
  getTasksForToday,
  getUpcomingTasks,
} from '../src/data/mockTasks.ts';

test('task helpers derive buckets and stats from the provided tasks and reference date', () => {
  const referenceDate = new Date('2026-04-18T09:00:00.000Z');
  const tasks = [
    {
      id: 'today-task',
      title: 'Due today',
      completed: false,
      priority: 'High',
      dueDate: new Date('2026-04-18T12:00:00.000Z'),
      list: 'Work',
      tags: [],
      createdAt: new Date('2026-04-17T09:00:00.000Z'),
    },
    {
      id: 'upcoming-task',
      title: 'Due tomorrow',
      completed: false,
      priority: 'Medium',
      dueDate: new Date('2026-04-19T08:00:00.000Z'),
      list: 'Personal',
      tags: [],
      createdAt: new Date('2026-04-17T09:00:00.000Z'),
    },
    {
      id: 'overdue-task',
      title: 'Overdue',
      completed: false,
      priority: 'Low',
      dueDate: new Date('2026-04-17T08:00:00.000Z'),
      list: 'Other',
      tags: [],
      createdAt: new Date('2026-04-16T09:00:00.000Z'),
    },
    {
      id: 'completed-task',
      title: 'Completed today',
      completed: true,
      priority: 'Low',
      dueDate: new Date('2026-04-17T08:00:00.000Z'),
      list: 'Shopping',
      tags: [],
      createdAt: new Date('2026-04-15T09:00:00.000Z'),
      completedAt: new Date('2026-04-18T07:30:00.000Z'),
    },
  ];

  assert.deepEqual(
    getTasksForToday(tasks, referenceDate).map((task) => task.id),
    ['today-task'],
  );
  assert.deepEqual(
    getUpcomingTasks(tasks, referenceDate).map((task) => task.id),
    ['upcoming-task'],
  );
  assert.deepEqual(
    getOverdueTasks(tasks, referenceDate).map((task) => task.id),
    ['overdue-task'],
  );
  assert.deepEqual(getTaskStats(tasks, referenceDate), {
    total: 4,
    completed: 1,
    completedToday: 1,
    overdue: 1,
    completionRate: 25,
  });
});
