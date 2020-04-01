/** @author Teun Stout
 * Class: iS202.
 * Project: Enterprise Web Application.
 * Calculation : https://people.revoledu.com/kardi/tutorial/AHP/AHP.htm;
 */
import { Injectable } from '@angular/core';
import { EnumNamingMartixService } from './enum-naming-martix.service';
import { TemplateResultService } from './template/Template-result.service';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private matrix: number[][];                                                     // 2D array for the matrix index.
  private matrixNormalized: number[][];                                           // Matrix with the values of the Reciprocal matrix or normalized matrix.
  private tempResult: TemplateResultService = new TemplateResultService();        // Save result to be used in barchart.

  // Create the Comparison matrix
  constructor(private enums: EnumNamingMartixService) {
    // instantiate matrix
    this.matrix = [];
    for (let i = 0; i < 5; i++) {
      this.matrix[i] = [];
    }

    // Instantiate the matrix
    this.matrixNormalized = [];
    for (let i = 0; i < this.matrix.length; i++) {
      this.matrixNormalized[i] = [];
    }

    // always set 1 to the indexes with the same indexnumber ([1][1])=([tuinieren][tuinieren])
    this.matrix[enums.REST_AND_RELAXATION][enums.REST_AND_RELAXATION] = 1;
    this.matrix[enums.EXCERSISE][enums.EXCERSISE] = 1;
    this.matrix[enums.MEETING_PEOPLE][enums.MEETING_PEOPLE] = 1;
    this.matrix[enums.GARDENING][enums.GARDENING] = 1;
    this.matrix[enums.NATURE][enums.NATURE] = 1;
    this.matrixNormalized[enums.REST_AND_RELAXATION][enums.REST_AND_RELAXATION] = 1;
    this.matrixNormalized[enums.EXCERSISE][enums.EXCERSISE] = 1;
    this.matrixNormalized[enums.MEETING_PEOPLE][enums.MEETING_PEOPLE] = 1;
    this.matrixNormalized[enums.GARDENING][enums.GARDENING] = 1;
    this.matrixNormalized[enums.NATURE][enums.NATURE] = 1;
  }

  // Put value's inside of the matrix
  public setMatrix(indexEnum1: number, value: number, indexEnum2: number) {
    if (value > 1) {                                             // Check if value is positive. If yes preference goes to enum1(index1)
      this.matrix[indexEnum1][indexEnum2] = value;
      this.matrix[indexEnum2][indexEnum1] = 1 / value;
    } else if (1 === value) {                                    // Check if value is 1. If yes user is neutral
      this.matrix[indexEnum1][indexEnum2] = value;
      this.matrix[indexEnum2][indexEnum1] = value;
    } else {                                                     // Check if value is positive. If yes preference goes to enum2(index2)
      this.matrix[indexEnum1][indexEnum2] = 1 / (-1 * value);
      this.matrix[indexEnum2][indexEnum1] = (-1 * value);
    }
  }

  public ReciprocalMartix() {
    // Calculate the normalized matrix
    for (let i = 0; i < this.matrix.length; i++) {
      let rowDenominator = 1;                 // Make the denominator for the sum of reciprocal matrix
      let rowCounterVertical: number[] = [];  // keeps track of individual result so we can later use it in normalized
      let rowCounter = 0;                     // total counter for reciprocal sum (will be devided by rowdenom)
      let rowDenominatorForDevide = 0;        // for normalized the divider becomes the counter of reciprocal

      // Calculate the denominator
      for (let h = 0; h < this.matrix[i].length; h++) {
        if (this.matrix[i][h] < 1) {
          rowDenominator = rowDenominator * this.determanFracture(this.matrix[i][h]);
        }
      }

      // calculate the counter
      for (let h = 0; h < this.matrix[i].length; h++) {
        if (this.matrix[i][h] < 1) {
          rowCounterVertical[h] = this.determanFracture(this.matrix[i][h]);
          rowCounter += rowDenominator / this.determanFracture(this.matrix[i][h]);
        } else {
          rowCounterVertical[h] = rowDenominator * this.matrix[i][h];
          rowCounter += rowDenominator * this.matrix[i][h];
        }
      }

      // normalized denominator is now the counter
      rowDenominatorForDevide = rowCounter;
      for (let h = 0; h < rowCounterVertical.length; h++) {
        this.matrixNormalized[i][h] = rowCounterVertical[h] / rowDenominatorForDevide;
      }

    } // End of the loop that makes the normalized matrix

    // Calculate the horizontal row to get the % of a diciplines
    for (let i = 0; i < this.matrixNormalized.length; i++) {
      let totalForRow = 0;
      for (let h = 0; h < this.matrixNormalized.length; h++) {
        totalForRow += this.matrixNormalized[h][i];
      }
      this.setTemplate(i, Math.round((totalForRow / this.matrixNormalized.length) * 100));
    }

    // this.makeOneHundred();
  }

  // get template
  public getTemplateResult() {
    return this.tempResult;
  }

  public getMatrix() {
    return this.matrix;
  }

  // Set the id of a template
  public setTemplateResultId(projectId: number) {
    this.tempResult.projectId = projectId;
  }

  // set dicipline with a percentage
  private setTemplate(enumNumber: number, valueOfSum: number) {
    switch (enumNumber) {
      case 0:
        this.tempResult.restAndRelaxation = valueOfSum;
        break;
      case 1:
        this.tempResult.exercise = valueOfSum;
        break;
      case 2:
        this.tempResult.meetingPeople = valueOfSum;
        break;
      case 3:
        this.tempResult.gardening = valueOfSum;
        break;
      case 4:
        this.tempResult.nature = valueOfSum;
        break;
    }
  }

  // with this you can the fracture because you cant save 1/3 whole as a number
  private determanFracture(fracture: number) {
    if (fracture === 0.125) {
      return 8;
    } else {
      return 4;
    }
  }
}
