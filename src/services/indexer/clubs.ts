import { IFreefit } from './../freefit';
import { IFreefitDataStore } from '../freefit-data-store';

export class ClubsIndexer {
  constructor(
    private freefit: IFreefit,
    private dataStore: IFreefitDataStore
  ) {}
  public async index() {
    const cities = await this.freefit.getCities();
    for (const city of cities) {
      const clubs = await this.freefit.getClubs(city);
      await this.persistClubs(clubs, city);
    }
  }

  private async persistClubs(clubs: string[], city: string) {
    for (const club of clubs) {
      const isExists = await this.dataStore.isClubExists(club, city);
      if (isExists) {
        continue;
      }

      await this.dataStore.saveClub(club, city);
    }
  }
}

/*
import axios, { AxiosPromise } from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

const freefitHost: string = 'https://freefit.co.il/';
const clubsSearchUrl: string = freefitHost + 'Pages/ClubList/?AREA=$';

export async function fetchClubs() {
  try {
    const response = await getRawCitiesData();
    const cities = scrapeCities(response.data);
    await populateClubs(cities);
    saveData(cities);
  } catch (err) {
    console.log(err);
  }
}

function getRawCitiesData(): AxiosPromise<any> {
  const citiesPath: string = 'Pages/ClubList/';
  return getRawData(freefitHost + citiesPath);
}

function getRawClubsData(city): AxiosPromise<any> {
  const clubsUrl = clubsSearchUrl.replace('$', encodeURIComponent(city));
  return getRawData(clubsUrl);
}

function getRawData(url): AxiosPromise<any> {
  return axios.get(url);
}

function scrapeCities(text): Array<Object> {
  const cities: Array<Object> = [];

  const $ = cheerio.load(text);

  $('#ddlArea option').map((_, elm) => {
    if (elm.attribs.value !== '-1') {
      cities.push({ id: elm.attribs.value, name: elm.children[0].data });
    }
  });

  return cities;
}

async function populateClubs(cities) {
  for (let city of cities) {
    try {
      const res = await getRawClubsData(city.name);
      const clubs = scarpeClubs(res.data);
      city.clubs = clubs;
    } catch (ex) {
      console.log(ex);
    }
  }
}

function scarpeClubs(text): Array<Object> {
  const clubs: Array<Object> = [];

  const $ = cheerio.load(text);

  $('#clubList tr td a.button').map((_, elm) => {
    clubs.push(elm.attribs.title);
  });

  return clubs;
}

function saveData(data) {
  const y = yaml.safeDump(data, {
    styles: {
      '!!null': 'canonical' // dump null as ~
    },
    sortKeys: true
  });
  fs.writeFile('./data/clubs.yml', y, err => {
    console.log(err);
  });
}
*/
