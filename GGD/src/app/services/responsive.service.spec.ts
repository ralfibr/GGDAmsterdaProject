import {TestBed} from '@angular/core/testing';
import {ResponsiveService} from './responsive.service';

/**
 * @author Hooshang Kooshani
 * Student number: 500809310
 */

describe('ResponsiveService', () => {
  let responsiveServiceTest: ResponsiveService;
  const testWidth = 700;
  beforeEach(() => TestBed.configureTestingModule({}));

  // standard test
  it('should be created', () => {
    const service: ResponsiveService = TestBed.get(ResponsiveService);
    expect(service).toBeTruthy();
  });

  // test 12: Checks if it detects a mobile phone
  it('check if window is the same as a mobile phone', () => {
    responsiveServiceTest = new ResponsiveService();
    spyOnProperty(window, 'innerWidth').and.returnValue(700);
    responsiveServiceTest.checkWidth();
    expect(responsiveServiceTest.screenWidth).toBe('sm');
  });
 // test 13: Checks if it notifies that the window is a desktop so the resize fucntion in a component works
  it('checks if it notifies that the window is a desktop so the resize fucntion in a component works', () => {
    responsiveServiceTest = new ResponsiveService();
    spyOnProperty(window, 'innerWidth').and.returnValue(700);
    responsiveServiceTest.getMobileStatus().subscribe(isMobile => {
      responsiveServiceTest.isMobile = isMobile;
      responsiveServiceTest.checkWidth();
      expect(responsiveServiceTest.screenWidth).toEqual('md');
    });
  });
});
