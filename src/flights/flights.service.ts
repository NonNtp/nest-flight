import { Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class FlightsService {
  max!: number;
  constructor(
    @InjectRepository(Flight)
    private flightsRepository: Repository<Flight>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    this.max = 50;
  }

  async create(createFlightDto: CreateFlightDto) {
    return this.flightsRepository.save(createFlightDto);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightsRepository.find();
  }

  async findByDeparture(
    departure: string,
    from: string,
    to: string,
  ): Promise<Flight> {
    console.log(
      this.max -
        (
          await this.connection.query(
            `SELECT count(*) AS total FROM flight WHERE flight.departure = "${departure}" AND flight.from = "${from}" AND flight.to = "${to}"`,
          )
        )[0].total,
    );

    return this.connection.query(
      `SELECT * FROM flight WHERE flight.departure = "${departure}" AND flight.from = "${from}" AND flight.to = "${to}"`,
    );
  }

  async findByDepartureNoPlace(departure: string): Promise<Flight> {
    return this.connection.query(
      `SELECT * FROM flight WHERE flight.departure = "${departure}" `,
    );
  }

  async findSeat(
    departure: string,
    from: string,
    to: string,
  ): Promise<Flight | number> {
    const seat = await this.connection.query(
      `SELECT sum(flight.adult + flight.children + flight.infants) AS total FROM flight WHERE flight.departure = "${departure}" AND flight.from = "${from}" AND flight.to = "${to}"`,
    );

    return this.max - seat[0].total;
  }

  async findSeatNoPlace(departure: string): Promise<Flight | number> {
    const seat = await this.connection.query(
      `SELECT sum(flight.adult + flight.children + flight.infants) AS total FROM flight WHERE flight.departure = "${departure}"`,
    );

    return this.max - seat[0].total;
  }

  async findPeople(
    departure: string,
    from: string,
    to: string,
  ): Promise<Flight | number> {
    const people = await this.connection.query(
      `SELECT sum(flight.adult + flight.children + flight.infants) as total FROM flight WHERE departure = "${departure}" AND flight.from = "${from}" AND flight.to = "${to}";`,
    );

    return people[0].total;
  }

  async findPeopleNoPlace(departure: string): Promise<Flight | number> {
    const people = await this.connection.query(
      `SELECT sum(flight.adult + flight.children + flight.infants) as total FROM flight WHERE departure = "${departure}" `,
    );

    return people[0].total;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    return this.flightsRepository.update(id, updateFlightDto);
  }

  async remove(id: number): Promise<void> {
    await this.flightsRepository.delete(id);
  }
}
