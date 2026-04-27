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
