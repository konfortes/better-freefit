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
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'location', type: 'json' },
          { name: 'status', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
