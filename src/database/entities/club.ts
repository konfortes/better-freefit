import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

export interface Location {
  latitude: string;
  longitude: string;
  formattedAddress?: string;
}

// TODO: does the Column atttribute can be empty?
@Entity({ name: 'clubs' })
export class Club {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: false })
  public name: string;

  @Column({ type: 'varchar' })
  public city: string;

  @Column({ name: 'formatted_address', type: 'varchar' })
  public formattedAddress: string;

  @Column({ type: 'json' })
  public location: Location | undefined;

  @Column({ type: 'varchar' })
  public status: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}
