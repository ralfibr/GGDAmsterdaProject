import { TestBed } from '@angular/core/testing';
import { DatabaseConnectionService } from './database-connection.service';


describe('DatabaseConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // Default test
  it('should be created', () => {
    const service: DatabaseConnectionService = TestBed.get(DatabaseConnectionService);
    expect(service).toBeTruthy();
  });

});
