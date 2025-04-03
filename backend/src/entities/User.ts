import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User entity representing public users of the booking system.
 */
@Entity()
export class User {
  /** Auto-incremented user ID */
  @PrimaryGeneratedColumn()
  id!: number;

  /** Unique user email used for login */
  @Column({ unique: true })
  email!: string;

  /** Hashed password */
  @Column()
  password!: string;

  /** User role: 'user' or 'admin' */
  @Column({ default: 'user' })
  role!: 'user' | 'admin';

  /** User display name */
  @Column({ nullable: true })
  name?: string;

  /** Profile picture (avatar) URL */
  @Column({ nullable: true })
  avatar?: string;

  /** Timestamp of registration */
  @CreateDateColumn()
  createdAt!: Date;

  /** Timestamp of last update */
  @UpdateDateColumn()
  updatedAt!: Date;
}
