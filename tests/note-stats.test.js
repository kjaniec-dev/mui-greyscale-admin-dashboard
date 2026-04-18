import assert from 'node:assert/strict';
import test from 'node:test';

import { getNoteStats } from '../src/data/mockNotes.ts';

test('note stats derive from the provided notes instead of the original mock dataset', () => {
  const notes = [
    {
      id: 'pinned-work-note',
      title: 'Pinned work note',
      content: '',
      folder: 'Work',
      tags: [],
      isPinned: true,
      createdAt: new Date('2026-04-18T08:00:00.000Z'),
      updatedAt: new Date('2026-04-18T08:00:00.000Z'),
    },
    {
      id: 'archived-note',
      title: 'Archived note',
      content: '',
      folder: 'Archive',
      tags: [],
      isPinned: false,
      createdAt: new Date('2026-04-18T08:00:00.000Z'),
      updatedAt: new Date('2026-04-18T08:00:00.000Z'),
    },
  ];

  assert.deepEqual(getNoteStats(notes), {
    total: 2,
    pinned: 1,
    byFolder: {
      Personal: 0,
      Work: 1,
      Ideas: 0,
      Archive: 1,
    },
  });
});
