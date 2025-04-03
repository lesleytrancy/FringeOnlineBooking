// src/entities/Seat.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venue } from './Venue';

/**
 * A specific seat inside a venue, used for assigned seating.
 */
@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  seatNumber!: string; // Seat identifier (e.g., A5)

  @Column()
  row!: string; // Row label (e.g., A, B)

  @Column()
  isAccessible!: boolean; // Whether the seat is wheelchair accessible

  @ManyToOne(() => Venue, (venue) => venue.seats)
  venue!: Venue; // The venue the seat belongs to
}

