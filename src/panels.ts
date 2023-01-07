import { QueryParams } from "./QueryParams";
import * as fs from "fs";
import { getDayBeforeTime } from "./time";
import { processData } from "./processData";
import { GenerationValues } from "./GenerationValues";
import chalk from "chalk";

const apiKey: string = fs.readFileSync("./api_key.txt", "utf8");

function generationPercentageCalculator(values: GenerationValues[]): void {
    const total = values.reduce((sum, current) => sum + current.value, 0);
    // is it an interchange object?
    const toBaName = values[0]["toba-name"] ? values[0]["toba-name"] : values[0]["respondent-name"];
    console.log(`Net generation for ${chalk.green(toBaName)}:`);
    values.map((n) => {
        const percentage: number = (n.value / total) * 100;
        const fromName = n["fromba-name"] ? n["fromba-name"] : n["type-name"];
        console.log(
            `${chalk.blue(fromName)} is ${chalk.red(
                percentage.toFixed(2)
            )}% wtih value ${chalk.yellow(n.value)} ${n["value-units"]}`
        );
        return percentage;
    });
}

// print out percentage of energy generated by this BA
export async function generationPercentage(
    BA: string,
    fueltype?: string[],
    reuse = false
): Promise<GenerationValues[]> {
    const generationQueryParams: QueryParams = {
        api_key: apiKey,
        frequency: "hourly",
        data: ["value"],
        facets: [["respondent", BA]],
        start: getDayBeforeTime(),
        sort: [
            {
                column: "period",
                direction: "desc",
            },
        ],
        offset: "0",
        length: "5000",
    };

    if (fueltype) {
        // add fueltype at the beginning
        fueltype.unshift("fueltype");
        generationQueryParams.facets?.push(fueltype);
    }

    const data: GenerationValues[] = await processData("generation", generationQueryParams);
    if (!reuse) generationPercentageCalculator(data);
    return data;
}

// Show details of the generation types this BA is producing plus the interchange % they are getting
export async function generationInterchangePercentage(
    BA: string,
    fueltype?: string[],
    reuse = false
): Promise<GenerationValues[]> {
    const interchangeQueryParams: QueryParams = {
        api_key: apiKey,
        frequency: "hourly",
        data: ["value"],
        facets: [
            ["respondent", BA],
            ["type", "TI"],
        ],
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

    // generationData will always be of type GenerationValues when reusing a panel
    const generationData: GenerationValues[] = (await generationPercentage(
        BA,
        fueltype,
        true
    )) as GenerationValues[];
    // There will be only one latest interchange value
    const interchange = (await processData("multiple", interchangeQueryParams))[0];
    // Value is sometimes negative
    interchange.value = Math.abs(interchange.value);
    generationData.push(interchange);
    if (!reuse) generationPercentageCalculator(generationData);
    return generationData;
}

// Show interchange data of the receiving BA
export async function interchangeRecvDetailsPercentage(
    BA: string,
    reuse = false
): Promise<GenerationValues[]> {
    const interchangeQueryParams: QueryParams = {
        api_key: apiKey,
        frequency: "hourly",
        data: ["value"],
        facets: [["toba", BA]],
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

    const interchange = await processData("interchange", interchangeQueryParams);
    if (!reuse) generationPercentageCalculator(interchange);
    return interchange;
}
