export interface EventsI {
  id: number | null;
  nameTask: string;
  descriptionTask: string | null;
  start: string | Date;
  end: string | Date;
}
