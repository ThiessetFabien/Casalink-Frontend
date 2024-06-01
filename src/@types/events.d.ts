export interface EventsI {
  id: number | null;
  nameTask: string;
  descriptionTask: string | null;
  start: string | Date;
  end: string | Date;
}

export interface EventsWithMemberI {
  id: number | null;
  nameTask: string;
  descriptionTask: string | null;
  start: string | Date;
  end: string | Date;
  memberTarget?: number | null;
}
