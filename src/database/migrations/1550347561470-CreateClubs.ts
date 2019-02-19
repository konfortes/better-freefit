import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClubs1550347561470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'clubs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          { name: 'name', type: 'varchar', isUnique: false },
          { name: 'city', type: 'varchar', isUnique: false },
          { name: 'formatted_address', type: 'varchar', isNullable: true },
          { name: 'location', type: 'json', isNullable: true },
          { name: 'status', type: 'varchar', default: "'pending'" },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
