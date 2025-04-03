// src/entities/BookingHistory.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Event } from './Event';

/**
 * Tracks user actions related to bookings (e.g., book, cancel).
 */
@Entity()
export class BookingHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Event)
  event!: Event;

  @Column()
  action!: string; // Action performed

  @Column()
  timestamp!: Date;
}

