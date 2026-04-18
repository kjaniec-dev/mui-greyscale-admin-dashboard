import assert from 'node:assert/strict';
import test from 'node:test';

import { getSidebarNavigationTarget } from '../src/layouts/DashboardLayout/sidebarNavigation.ts';

test('collapsed sidebar parents navigate to the first reachable child route', () => {
  assert.equal(
    getSidebarNavigationTarget(
      {
        title: 'Finance',
        path: '/finance',
        children: [
          { title: 'Transactions', path: '/finance/transactions' },
          { title: 'Refunds', path: '/finance/refunds' },
        ],
      },
      true,
    ),
    '/finance/transactions',
  );
});
