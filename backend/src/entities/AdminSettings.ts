// src/entities/AdminSettings.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Global settings used for admin panel configuration.
 */
@Entity()
export class AdminSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  settingKey!: string;

  @Column()
  settingValue!: string;

  @Column()
  updatedAt!: Date;
}

