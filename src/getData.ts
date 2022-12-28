import * as fs from "fs";

export async function getData(endpoint: string, searchParams: string): Promise<string> {
    // Ask the server for data
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json " },
    };
    let fileName: string;
    switch (endpoint) {
        case "/v2/electricity/rto/fuel-type-data/data/":
            fileName = "generation-by-energy-source.json";
            break;
        case "/v2/electricity/rto/region-data/data/":
            fileName = "d-dForcast-generation-interchange.json";
            break;
        case "/v2/electricity/rto/region-sub-ba-data/data/":
            fileName = "d-by-subregion.json";
            break;
        case "/v2/electricity/rto/interchange-data/data/":
            fileName = "interchange.json";
            break;
        default:
            fileName = "data.json";
    }

    try {
        const response = await fetch(`https://api.eia.gov${endpoint}?${searchParams}`, options);
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