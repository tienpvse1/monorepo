export class CreateCourseDto {
  name: string;
  code: string;
  startDate: Date;
  endDate: Date;
  numberOfTrainee: number;
  isActive: boolean;
  course_Type?: any;
}

// {
//   "id": 3120,
//   "name": "VJC Induction and Orientation - Batch 48",
//   "code": "GAT-2018-041",
//   "startDate": "2018-08-11T00:00:00",
//   "endDate": "2018-08-19T00:00:00",
//   "companyId": null,
//   "numberOfTrainee": 60,
//   "courseTypeId": 1,
//   "isActive": true,
//   "isDeleted": false,
//   "course_Type": {
//     "course_Type_Id": 1,
//     "str_Name": "Initial"
//   },

// }
