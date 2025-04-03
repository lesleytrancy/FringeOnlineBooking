// src/entities/EventCategory.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './Event';

/**
 * Used to organize events into categories (e.g., Music, Comedy).
 */
@Entity()
export class EventCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // Name of the category

  @OneToMany(() => Event, (event) => event.category)
  events!: Event[];
}

