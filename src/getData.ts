import * as fs from "fs";
import { QueryParams } from "./QueryParams";
import { stringify } from "./stringify";

export async function getData(dataType: string, searchParams: QueryParams): Promise<string> {
    // Ask the server for data
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json " },
    };
    let fileName: string;
    let endpoint: string;
    switch (dataType) {
        case "generation":
            endpoint = "/v2/electricity/rto/fuel-type-data/data/";
            fileName = "generation-by-energy-source.json";
            break;
        case "multiple":
            endpoint = "/v2/electricity/rto/region-data/data/";
            fileName = "d-dForcast-generation-interchange.json";
            break;
        case "dbysubregion":
            endpoint = "/v2/electricity/rto/region-sub-ba-data/data/";
            fileName = "d-by-subregion.json";
            break;
        case "interchange":
            endpoint = "/v2/electricity/rto/interchange-data/data/";
            fileName = "interchange.json";
            break;
        default:
            endpoint = "/v2/electricity/rto/region-data/data/";
            fileName = "data.json";
    }

    try {
        const response = await fetch(
            `https://api.eia.gov${endpoint}?${stringify(searchParams)}`,
            options
        );
        const data = await response.json();
        // shift + alt + f to make vs code format your json file
        const dataString: string = JSON.stringify(data);
        // Write the data to a file to visualize it
        fs.writeFileSync(`./data/${fileName}`, dataString);
        return dataString;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
