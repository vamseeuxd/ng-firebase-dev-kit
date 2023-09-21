import { Injectable } from '@angular/core';
import {
  Country,
  State,
  City,
  ICountry,
  IState,
  ICity,
} from 'country-state-city';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];
  constructor() {
    this.countries = Country.getAllCountries();
  }

  getStatesOfCountry(countryCode?: string): void {
    this.states = State.getStatesOfCountry(countryCode);
  }

  getCitiesOfState(countryCode: string, stateCode: string): void {
    this.cities = City.getCitiesOfState(countryCode, stateCode);
  }

  getStateByCodeAndCountry(
    stateCode: string,
    countryCode: string
  ): IState | undefined {
    return State.getStateByCodeAndCountry(stateCode, countryCode);
  }

  getCountryByCode(stateCode: string): ICountry | undefined {
    return Country.getCountryByCode(stateCode);
  }
}
