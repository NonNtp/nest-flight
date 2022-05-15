import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flight_id: number;

  @Column()
  fullName: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column('date', { nullable: true })
  departure: Date;

  @Column('date', { nullable: true })
  arrival: Date;

  @Column()
  adult: number;

  @Column()
  children: number;

  @Column()
  infants: number;
}
