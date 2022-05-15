import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('/create')
  async create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @Get()
  async findAll() {
    return this.flightsService.findAll();
  }

  @Get(':departure/:from/:to')
  async findFlight(
    @Param('departure') departure: string,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    return this.flightsService.findByDeparture(departure, from, to);
  }

  @Get(':departure')
  async findFlightNoPlace(@Param('departure') departure: string) {
    return this.flightsService.findByDepartureNoPlace(departure);
  }

  @Get('/seat/:departure/:from/:to')
  async findSeats(
    @Param('departure') departure: string,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    return this.flightsService.findSeat(departure, from, to);
  }

  @Get('/seat/:departure')
  async findSeatsNoplace(@Param('departure') departure: string) {
    return this.flightsService.findSeatNoPlace(departure);
  }

  @Get('/people/:departure/:from/:to')
  async findCountPeople(
    @Param('departure') departure: string,
    @Param('from') from: string,
    @Param('to') to: string,
  ) {
    return this.flightsService.findPeople(departure, from, to);
  }

  @Get('/people/:departure')
  async findCountPeopleNoPlace(@Param('departure') departure: string) {
    return this.flightsService.findPeopleNoPlace(departure);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.flightsService.remove(id);
  }
}
