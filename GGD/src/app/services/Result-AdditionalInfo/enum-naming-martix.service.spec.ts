import { TestBed } from '@angular/core/testing';
import { EnumNamingMartixService } from './enum-naming-martix.service';

describe('EnumNamingMartixService', () => {
  let enumTest: EnumNamingMartixService;
  beforeEach(() => TestBed.configureTestingModule({}));

  // Default Test
  it('should be created', () => {
    const service: EnumNamingMartixService = TestBed.get(EnumNamingMartixService);
    expect(service).toBeTruthy();
  });

  // Check switch and if it returns the right awnser
  // Unit test 6 writen by Teun Stout -> 500807530
  it('Check if you get the right enum (TEST 6)', () => {
    enumTest = new EnumNamingMartixService();
    expect(enumTest.checkStringWithEnum('Bewegen')).toBe(1);  // Bewegen must return 1
  });

  // Check if you get null with invalid data
  // Unit test 8 writen by Teun Stout -> 500807530
  it('Test default of case (TEST 8)', () => {
    enumTest = new EnumNamingMartixService();
    expect(enumTest.checkStringWithEnum('empty')).toBe(null);
  });
});
