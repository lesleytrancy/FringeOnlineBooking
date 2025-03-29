// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './Ticket';

/**
 * Represents a public user or ticket purchaser.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string; // User's unique email

  @Column()
  passwordHash!: string; // Hashed password

  @Column()
  fullName!: string;

  @Column()
  isAdmin!: boolean; // Distinguishes regular users from admins

  @OneToMany(() => Ticket, (ticket) => ticket.buyer)
  tickets!: Ticket[];
}

