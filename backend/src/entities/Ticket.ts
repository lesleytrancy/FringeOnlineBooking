// src/entities/Ticket.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Event } from './Event';
import { Seat } from './Seat';
import { User } from './User';

/**
 * A purchasable ticket for an event, optionally tied to a seat.
 */
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Event, (event) => event.tickets)
  event!: Event;

  @ManyToOne(() => Seat, { nullable: true })
  seat?: Seat; // Optional assigned seat

  @Column()
  price!: number;

  @Column()
  ticketType!: string; // E.g., General, VIP

  @Column()
  qrCode!: string; // QR code for validation at entry

  @Column()
  isSold!: boolean; // Indicates if ticket has been purchased

  @ManyToOne(() => User, (user) => user.tickets, { nullable: true })
  buyer?: User; // The user who bought the ticket
}

