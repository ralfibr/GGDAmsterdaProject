import { TestBed } from '@angular/core/testing';

import { MatrixService } from './matrix.service';

describe('MatrixService', () => {

  // Default test
  it('should be created', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    expect(service).toBeTruthy();
  });

  // For the formula all indexes like [1,1] should be 1 because you are always nutral when you have to choose between same diciplines
  // like gardening and gardening
  // Unit test 1 writen by Teun Stout -> 500807530
  it('Check if the matrix setup is right (TEST 1)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    const matrix = service.getMatrix();
    for (let i = 0; i < matrix.length; i++) {
      expect(matrix[i][i]).toEqual(1);
    }
  });

  // check if the matrix is the right size so all values fit
  // Unit test 2 writen by Teun Stout -> 500807530
  it('Check if the matrix size is right (TEST 2)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    const matrix = service.getMatrix();
    const size = 5 * 5;                                             // 2d array should be of size 5 * 5;
    let actualsize = 0;                                             // check if array is 5 * 5;

    for (let i = 0; i < matrix.length; i++) {
      for (let h = 0; h < matrix.length; h++) {
        actualsize++;                                               // each index actualsize goes up
      }
    }

    expect(size).toEqual(actualsize);                                     // size should equal actualsize
  });

  // Check if the postive int we give is being set correct in the matric
  // Unit test 3 writen by Teun Stout -> 500807530
  it('Check if the 2d array is set correct with positive int (TEST 3)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    const index1 = 1;                                               // index 1 (Enum excercise)
    const index2 = 2;                                               // index 1 (Enum meeting people)
    const value = 8;                                                // value
    service.setMatrix(index1, value, index2);
    const matrix = service.getMatrix();
    expect(matrix[index1][index2]).toEqual(value);                  // should be equal to the value we gave
  });

  // Check if the negative int we give is being set correct in the matric
  // Unit test 4 writen by Teun Stout -> 500807530
  it('Check if opposite value is set correct with negative int (TEST 4)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    const index1 = 1;                                               // index 1 (Enum excercise)
    const index2 = 2;                                               // index 1 (Enum meeting people)
    const value = -8;                                                // value
    const fracture = 0.125;                                         // private function will set fracture to 0.125 for opposite

    service.setMatrix(index1, value, index2);
    const matrix = service.getMatrix();
    expect(matrix[index1][index2]).toEqual(fracture);
  });

  // Check if the result is good; and thus the calculation
  // Unit test 5 writen by Teun Stout -> 500807530
  it('Check if index returns 20% for each dicipline (TEST 5)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    const value = 1;
    const size = 5;

    for (let i = 0; i < size; i++) {
      for (let h = 0; h < size; h++) {
        service.setMatrix(i, value, h);
      }
    }

    service.ReciprocalMartix();

    expect(service.getTemplateResult().restAndRelaxation).toEqual(20);
    expect(service.getTemplateResult().nature).toEqual(20);
    expect(service.getTemplateResult().meetingPeople).toEqual(20);
    expect(service.getTemplateResult().gardening).toEqual(20);
    expect(service.getTemplateResult().exercise).toEqual(20);
  });

  // Check if the id is good; and thus the calculation
  // Unit test 7 writen by Teun Stout -> 500807530
  it('Check if index returns 20% for each dicipline (TEST 7)', () => {
    const service: MatrixService = TestBed.get(MatrixService);
    service.setTemplateResultId(1);
    expect(service.getTemplateResult().projectId).toEqual(1);
  });
});
