import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { EventCategory } from "./EventCategory";
import { Ticket } from "./Ticket";
import { Venue } from "./Venue";

/**
 * Represents a single performance or show in the festival.
 */
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-increment primary key

  @Column()
  name!: string; // Name of the event

  @Column('text')
  description!: string; // Full description of the event

  @Column()
  startDate!: Date; // Start datetime

  @Column()
  endDate!: Date; // End datetime

  @ManyToOne(() => Venue, (venue) => venue.events)
  venue!: Venue; // Venue where the event happens

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets!: Ticket[]; // All tickets associated with this event

  @ManyToOne(() => EventCategory, (category) => category.events, { nullable: true })
  category?: EventCategory; // Optional category for filtering

  @Column()
  isActive!: boolean; // Indicates if the event is currently available
}
