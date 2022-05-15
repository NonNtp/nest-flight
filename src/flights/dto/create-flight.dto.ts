export class CreateFlightDto {
  id: number;
  fullName: string;
  from: string;
  to: string;
  departure: Date;
  adult: number;
  children: number;
  infants: number;
}
