export interface TEvents {
  title: string;
  description: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  organizer: string;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export type TGetEventsQuery = {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
  eventType?: string;
};
