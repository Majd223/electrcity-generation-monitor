import { GenerationValues } from "./GenerationValues";
import { getData } from "./getData";
import { QueryParams } from "./QueryParams";

export async function processData(
    dataType: string,
    searchParams: QueryParams,
    retrievalTime?: string
): Promise<GenerationValues[]> {
    const dataString = await getData(dataType, searchParams);
    // Define the reviver function
    const fullData = JSON.parse(dataString);
    const data = fullData.response;
    const values: GenerationValues[] = [];
    if (data.total !== 0) {
        // Grab the latest data you can find form the top item since latest is shown first.
        // Or take a function input and use that
        const latestDate: string = retrievalTime ? retrievalTime : data.data[0].period;
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
        // else show older data?
    }

    return values;
}
