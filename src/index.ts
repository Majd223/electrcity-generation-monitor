import { QueryParams } from "./QueryParams";
import { stringify } from "./stringify";
import * as fs from "fs";

const queryParams: QueryParams = {
    api_key: fs.readFileSync("./api_key.txt", "utf8"),
    frequency: "hourly",
    data: ["value"],
    facets: [["respondent", "PSEI"]],
    start: getCurrentTime(),
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

// Get the current time and format it to be like YYYY-MM-DD"T"HH
function getCurrentTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    // 08 always gives the latest information?
    return `${year}-${month}-${day}T08`;
}

function getData(endpoint: string, searchParams: string) {
    // Ask the server for data
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json " },
    };
    fetch(`https://api.eia.gov${endpoint}?${searchParams}`, options)
        .then((response) => response.json())
        .then((data) => {
            // shift + alt + f to make vs code format your json file
            fs.writeFileSync("data.json", JSON.stringify(data));
        })
        .catch((error) => console.error(error));
}
console.log("Start date: " + queryParams.start);
// Put the URL GET request together
const endpoint = "/v2/electricity/rto/fuel-type-data/data/";
const searchParams = stringify(queryParams);

if (searchParams !== undefined) {
    getData(endpoint, searchParams);
}
