import { Club } from './../database/entities/club';
import { FreefitDataStore } from './freefit-data-store';
import { getConnection } from '../database';
import { Connection, Repository } from 'typeorm';

describe('FreefitDataStore', () => {
  let connection: Connection;
  let repo: Repository<Club>;

  beforeAll(async () => {
    connection = await getConnection();
    repo = connection.getRepository(Club);
  });
  afterAll(async () => {
    connection.close();
  });

  describe('#getClubs', () => {
    describe('without query', () => {
      beforeAll(async () => {
        await repo.delete({});
        const club1 = new Club();
        club1.city = 'אילת';
        club1.location = { latitude: '32.32', longitude: '33.33' };
        club1.name = 'הולמס פלייס';
        club1.status = 'pending';
        const club2 = new Club();
        club2.city = 'גבעתיים';
        club2.location = { latitude: '34.32', longitude: '35.33' };
        club2.name = 'גו אקטוב';
        club2.status = 'pending';
        const clubs = [club1, club2];
        await repo.save(clubs);
      });

      it('should fetch all clubs', async () => {
        const dataStore = new FreefitDataStore();
        const clubs = await dataStore.getClubs();

        expect(clubs.length).toBe(2);
      });
    });
    describe('with query', () => {
      it('should fetch only relevant clubs', async () => {
        const dataStore = new FreefitDataStore();
        const clubs = await dataStore.getClubs({ city: 'אילת' });

        expect(clubs.length).toBe(1);
      });
    });
  });
});
