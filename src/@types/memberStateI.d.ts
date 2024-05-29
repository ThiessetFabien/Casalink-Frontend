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
  profile_id: number;
}

export interface MemberStateI {
  id: number | null;
  name: string;
  birthdate: Date;
  score: number;
  tasks: string[];
  avatar: string;
  role: string;
  pin: number;
  email: string;
}
