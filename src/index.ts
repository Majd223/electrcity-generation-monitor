import { QueryParams } from "./QueryParams";
import { stringify } from "./stringify";
import * as fs from "fs";
import { fuelData } from "./fuel-data";
import { getData } from "./getData";
import { getDayBeforeTime } from "./getTime";
const queryParams: QueryParams = {
    api_key: fs.readFileSync("./api_key.txt", "utf8"),
    frequency: "hourly",
    data: ["value"],
    facets: [["respondent", "PSEI"]],
    start: getDayBeforeTime(),
    end: null,
    sort: [
        {
            column: "period",
            direction: "desc",
        },
    ],
    offset: "0",
    length: "5000",
};

// Put the URL GET request together
const endpoint = "/v2/electricity/rto/fuel-type-data/data/";
const searchParams = stringify(queryParams);

// Throw error and exit if searchParams is undefined
if (searchParams === undefined) {
    throw new Error("Search Params undefined");
}

async function processData() : Promise<fuelData[]> {
    const dataString = await getData(endpoint, searchParams);
    // Define the reviver function
    const fullData = JSON.parse(dataString);
    const data = fullData.response;
    let values: fuelData[] = [];
    if (data.total !== 0) {
        // Grab the latest data you can find.
        const latestDate: string = data.data[0].period;
        for (const element of data.data) {
            // add fuel value and fuel type to the list
            if (element.period === latestDate) {
                // Add it to the list
                values.push(element);
            } else {
                // Leave the loop
                break;
            }
        }
    } else {
        // else show old data?
    }

    return values;
}

processData();
