// src/entities/Venue.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './Event';
import { Seat } from './Seat';

/**
 * A physical location where events take place.
 */
@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // Venue name

  @Column()
  location!: string; // Physical or geographic location

  @OneToMany(() => Event, (event) => event.venue)
  events!: Event[]; // Events scheduled at this venue

  @OneToMany(() => Seat, (seat) => seat.venue)
  seats!: Seat[]; // All seats in this venue
}
