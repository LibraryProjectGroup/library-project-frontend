export interface HomeOffice {
  id: number;
  name: string;
  /**
   * A ISO 3166-1 alpha-3 country code
   */
  countryCode: string;
  officeLocation: HomeOfficeCoordinate;
}

export interface HomeOfficeCoordinate {
  latitude: number;
  longitude: number;
}
