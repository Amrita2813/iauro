import { StudentFormComponent } from './../student-form/student-form.component';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { StudentTableComponent } from "../student-table/student-table.component";
import { IStudentDetails, studentsData } from "../Interface/studentDetails";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudentTableComponent,StudentFormComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  studentTableData!:IStudentDetails[];

  @ViewChild(StudentFormComponent) StudentFormComponent!: StudentFormComponent;

  ngOnInit(): void {
      this.studentTableData = studentsData
  }

  updatedStudentDetails(data:IStudentDetails[]) {
    this.studentTableData = [...data];
    console.log('studentTableData',this.studentTableData)
  }

  editStudent(studentData:any) {
    console.log('student data',studentData);
    this.StudentFormComponent.scrollToForm();
    this.StudentFormComponent.patchForm(studentData)
  }

  deleteStudentRecord(studentDetails:IStudentDetails[]) {
    this.studentTableData = studentDetails;
  }
}
