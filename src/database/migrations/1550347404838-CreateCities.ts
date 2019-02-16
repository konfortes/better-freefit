import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCities1550347404838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
