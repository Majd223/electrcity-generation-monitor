export interface QueryParams {
    api_key: string;
    frequency: string;
    data: string[];
    facets: string[][] | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    sort:
        | {
              column: string;
              direction: string;
          }[]
        | undefined;
    offset: string | number;
    length: string | number;
}
