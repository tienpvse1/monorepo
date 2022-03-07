export interface ICreateScheduleDto {
  type: string;
  summary: string;
  note: string;
  dueDate: Date;
  accountId: string;
  pipelineItemId: string;
}
