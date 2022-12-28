import { QueryParams } from "./QueryParams";
import * as fs from "fs";
import { getDayBeforeTime } from "./time";
import { generationPercentage } from "./panels";

function main() {
    const apiKey: string = fs.readFileSync("./api_key.txt", "utf8");
    // can be used on multi and generation
    const queryParams: QueryParams = {
        api_key: apiKey,
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

    const names: string[] = ["multiple", "generation", "dbysubregion", "interchange"];
    generationPercentage("PSEI");
}
main();
