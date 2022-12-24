import { QueryParams } from "./QueryParams";

// Read json and make it as a searchparam for the URL
// TODO: add guarding for undefined
// TODO: remove the first element in facets
export function stringify(json: QueryParams): string {
    function stringifyHelper(arr: string[], listType: string, listName?: string): string {
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            if (listName) {
                result += `&${listType}[${listName}][]=${arr[i]}`;
            } else {
                result += `&${listType}[${i}]=${arr[i]}`;
            }
        }
        return result;
    }

    let finalResult = "";
    // Add api_key and frequency and data
    finalResult += `api_key=${json.api_key}&frequency=${json.frequency}`;
    finalResult += `${stringifyHelper(json.data, "data")}`;
    // Check if there is facets and add it
    if (json.facets) {
        for (let i = 0; i < json.facets.length; i++) {
            finalResult += stringifyHelper(json.facets[i], "facets", json.facets[i][0]);
        }
    }
    // Add start and end
    if (json.start) {
        finalResult += `&start=${json.start}`;
    }
    if (json.end) {
        finalResult += `&end=${json.end}`;
    }
    if (json.sort) {
        for (let i = 0; i < json.sort.length; i++) {
            const current = json.sort[i];
            finalResult += `&sort[${i}][column]=${current.column}`;
            finalResult += `&sort[${i}][direction]=${current.direction}`;
        }
    }
    // Add offset and length
    finalResult += `&offset=${json.offset}&length=${json.length}`;
    return finalResult;
}
