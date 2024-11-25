import { IStudentDetails } from './../Interface/studentDetails';
import { MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss'
})
export class StudentTableComponent implements OnInit, OnChanges{
displayedColumns:string[] = ['firstName','lastName','gender','grade','subject','comments','actions']

@Input() studentDetails!:IStudentDetails[]
@Output() editStudentEvent = new EventEmitter();
@Output() deleteStudentRecordEvent = new EventEmitter();

constructor(private dialog:MatDialog) {}

ngOnInit(): void {}

ngOnChanges(changes: SimpleChanges): void {
    console.log('studentDetails',this.studentDetails)
}

editStudent(studentDetails:any){
  this.editStudentEvent.emit(studentDetails);
}

deleteStudent(studentRecord:any) {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
    width:'300px',
    data:{name:`${studentRecord.firstName} ${studentRecord.lastName}`}
  })

  dialogRef.afterClosed().subscribe((result) => {
    if(result) {
      console.log(studentRecord);
      this.studentDetails = this.studentDetails.filter((ele:any) => ele.rollNumber !== studentRecord.rollNumber);
      this.deleteStudentRecordEvent.next([...this.studentDetails]);
    }
  })
}

}
