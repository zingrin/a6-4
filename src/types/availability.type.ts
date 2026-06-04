
export interface AvailabilityData {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  status: string;
  tutorId: string;
}

export interface AvailabilityCardProps {
  availability: AvailabilityData;
}

export enum AvailabilityStatus {
  BOOKED = "BOOKED",
  AVAILABLE = "AVAILABLE"
}