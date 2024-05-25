export interface TaskStateI {
  id: number | null;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  reward_point: number;
  category_id: number;
  priority: string;
  profileId: number;
}

export interface MemberStateI {
  id: number | null;
  name: string;
  birthday: Date;
  score: number;
  tasks: string[];
  avatar: string;
}
