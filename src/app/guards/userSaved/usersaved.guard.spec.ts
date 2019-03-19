import { TestBed, async, inject } from '@angular/core/testing';

import { UsersavedGuard } from './usersaved.guard';

describe('UsersavedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersavedGuard]
    });
  });

  it('should ...', inject([UsersavedGuard], (guard: UsersavedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
