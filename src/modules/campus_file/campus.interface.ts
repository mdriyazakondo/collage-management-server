export interface TCampus {
  title: string;
  description: string;
  photos?: string[];
  videos?: string[];
  date: string;
  location: string;
}

export type TGetCampusQuery = {
  search?: string;
  sort?: string;
  page?: string;
  limit?: string;
};
