export interface TaskInputI {
  id: number;
  nameTask: string;
  descriptionTask: string;
  startDate: string;
  startTime: string;
  endTime: string;
  endDate: string;
}

export interface TaskI {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  reward_point: number;
  priority: string;
  status: string;
  description: string;
  category_id: number;
  profile_id: number;
}
