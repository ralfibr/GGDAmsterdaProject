package ewa.backend.resource;

import ewa.backend.entity.OptionalUserInformation;
import ewa.backend.entity.Result;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.FileOutputStream;
import java.util.List;

/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 */
public class Excel {

    private int projectId;                                                      // Id of project
    private static final String FILE_NAME = "../../../ProjectData.xlsx";        // Save file to this path
    private List<Result> resultsProject;                                        // List of project data
    private List<OptionalUserInformation> optionalUserInformation;              // List of user information
    private String[] nameColumUserinfo = {"Age", "Gender", "postal", "email"};  // Titles for user
    private String[] nameColumResult = {"Rest and Relaxation", "exercise", "meetingPeople", "gardening", "nature"}; // Titles for Result

    public Excel(List<Result> resultsProject, List<OptionalUserInformation> optionalUserInformation) {
        this.resultsProject = resultsProject;
        this.optionalUserInformation = optionalUserInformation;
        if (resultsProject.size() != 0) {
            projectId = resultsProject.get(0).getProjectId();
        }
        createExcel();
    }

    private void createExcel() {
        // Start set title for cells
        final int START_CELL = 1;
        final int START_ROW = 3;
        // Create excel
        XSSFWorkbook workbook = new XSSFWorkbook();
        // Create sheets in excel
        XSSFSheet resultSheet = workbook.createSheet("Result");
        XSSFSheet userSheet = workbook.createSheet("Users");

        // Display the project code
        Row projectCode = resultSheet.createRow(0);
        Row resultTitle = resultSheet.createRow(START_ROW - 1);
        Row userTitle = userSheet.createRow(START_ROW - 1);

        // Set the column width so all data is right size for data
        resultSheet.setColumnWidth(0, 4000);
        resultSheet.setColumnWidth(1, 5000);
        resultSheet.setColumnWidth(2, 4000);
        resultSheet.setColumnWidth(3, 5000);
        resultSheet.setColumnWidth(4, 3000);
        resultSheet.setColumnWidth(5, 3000);
        userSheet.setColumnWidth(1, 2000);
        userSheet.setColumnWidth(2, 3000);
        userSheet.setColumnWidth(3, 4000);
        userSheet.setColumnWidth(4, 7000);

        // Set the font styles and size
        Font titleFont = workbook.createFont();
        titleFont.setBold(true);
        CellStyle styleHeader = workbook.createCellStyle();
        styleHeader.setFont(titleFont);
        styleHeader.setAlignment(HorizontalAlignment.LEFT);

        // Start rows for data
        int row = START_ROW;
        int cell = START_CELL;

        // Set the values for the project cell
        Cell projectCell = projectCode.createCell(0);
        projectCell.setCellValue("projectId: " + projectId);      // set project code
        projectCell.setCellStyle(styleHeader);

        // create the title for result
        for (String titleResult : nameColumResult) {
            Cell titleCell = resultTitle.createCell(cell++);
            titleCell.setCellValue(titleResult + ": ");
            titleCell.setCellStyle(styleHeader);
        }

        // set all the data in excel sheet for result
        for (Result result : resultsProject) {
            cell = START_CELL;
            Row rowSheet = resultSheet.createRow(row++);
            rowSheet.createCell(cell++).setCellValue(result.getRestAndRelaxation());
            rowSheet.createCell(cell++).setCellValue(result.getExercise());
            rowSheet.createCell(cell++).setCellValue(result.getMeetingPeople());
            rowSheet.createCell(cell++).setCellValue(result.getGardening());
            rowSheet.createCell(cell++).setCellValue(result.getNature());
        }

        cell = START_CELL;

        // set title for user next to result
        for (String titleUser : nameColumUserinfo) {
            Cell titleCell = userTitle.createCell(cell++);
            titleCell.setCellValue(titleUser + ": ");
            titleCell.setCellStyle(styleHeader);
        }

        row = START_ROW; // reset row to 2

        // set all the data in excel sheet for user
        for (OptionalUserInformation optionalUserInformation : optionalUserInformation) {
            cell = START_CELL;
            Row rowSheet = userSheet.createRow(row++);
            rowSheet.createCell(cell++).setCellValue(optionalUserInformation.getAge());
            rowSheet.createCell(cell++).setCellValue(optionalUserInformation.getGender());
            rowSheet.createCell(cell++).setCellValue(optionalUserInformation.getPostal());
            rowSheet.createCell(cell++).setCellValue(optionalUserInformation.getEmail());
        }

        // download excel
        try {
            FileOutputStream outputStream = new FileOutputStream(FILE_NAME);
            workbook.write(outputStream);
            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
