import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button"
import { map, Observable, startWith } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { IStudentDetails, studentsData } from "../Interface/studentDetails";


@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {

  grades: string[] = ['A', 'B', 'C', 'D', 'F'];
  subjects: string[] = ['Math', 'Science', 'History', 'Geography', 'English'];
  subjectControl = new FormControl('');
  filteredSubjects!: Observable<string[]> | undefined;
  studentDetails!:IStudentDetails[]
  editStudentDetail!:IStudentDetails;
  isEdit:boolean = false;

  @Output() updatedData = new EventEmitter;

   @ViewChild('studentFormRef') studentFormElement!: ElementRef;

  studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    gender: new FormControl('', [Validators.required]),
    termsConditions: new FormControl(false, [Validators.required]),
    grade: new FormControl('', [Validators.required]),
    subject: new FormControl(''),
    comments: new FormControl('')
  })

  ngOnInit(): void {
    this.filteredSubjects = this.studentForm.get('subject')?.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '')))
    this.studentDetails = studentsData
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.subjects.filter((subject) => subject.toLowerCase().includes(filterValue));
  }

  submitStudentForm() {
    const newStudent:IStudentDetails = {
    rollNumber:!this.isEdit ? this.studentDetails.length + 1 : this.editStudentDetail.rollNumber,
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    gender: this.gender.value,
    termsConditions:this.termsConditions.value,
    grade:this.gender.value,
    subject:this.subject.value,
    comments:this.comments.value
  }

  !this.isEdit && this.studentDetails.push(newStudent);
  if(this.isEdit) {
    const index = this.studentDetails.findIndex((student:IStudentDetails) => student.rollNumber === this.editStudentDetail.rollNumber);
    if(index !== -1) {
      this.studentDetails[index]=newStudent;
    }
  }
  this.updatedData.emit([...this.studentDetails]);
  this.studentForm.reset();
  this.isEdit = false
  }

  scrollToForm():void {
    this.isEdit = true;
    this.studentFormElement.nativeElement.scrollIntoView({behavior:'smooth'});
  }

  patchForm(data:any) {
    this.editStudentDetail = data;
    this.studentForm.patchValue(data)
  }


  get firstName() {
    return this.studentForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.studentForm.get('lastName') as FormControl;
  }

  get gender() {
    return this.studentForm.get('gender') as FormControl;
  }

  get termsConditions() {
    return this.studentForm.get('termsConditions') as FormControl;
  }

  get grade() {
    return this.studentForm.get('grade') as FormControl;
  }

  get subject() {
    return this.studentForm.get('grade') as FormControl;
  }

  get comments() {
    return this.studentForm.get('comments') as FormControl;
  }

}
