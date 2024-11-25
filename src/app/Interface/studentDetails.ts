export const studentsData:IStudentDetails[] = [
  // Two default record for editing and deleting
  {
  rollNumber:1,
  firstName:'Amrita',
  lastName:'Kaur',
  gender:'Female',
  termsConditions:true,
  grade:'A',
  subject:'English',
  comments:'Needs Improovement'
  },
   {
  rollNumber:2,
  firstName:'Datshana',
  lastName:'Gandhi',
  gender:'Female',
  termsConditions:false,
  grade:'B',
  subject:'English',
  comments:'Excellent Performance'
  }
];

export interface IStudentDetails  {
  rollNumber:number,
  firstName:string,
  lastName?:string,
  gender:string,
  termsConditions:boolean,
  grade:string,
  subject?:string,
  comments?:string
}
