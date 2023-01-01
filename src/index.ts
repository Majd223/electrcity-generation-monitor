import { QueryParams } from "./QueryParams";
import * as fs from "fs";
import { getDayBeforeTime } from "./time";
import {
    generationInterchangePercentage,
    generationPercentage,
    interchangeRecvDetailsPercentage,
} from "./panels";

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
    generationPercentage("CAL");
    generationInterchangePercentage("PSEI");
    interchangeRecvDetailsPercentage("PSEI");
}
main();

enum BAS {
    AEC = "PowerSouth Energy Cooperative",
    AECI = "Associated Electric Cooperative, Inc.",
    AVA = "	Avista Corporation",
    AVRN = "Avangrid Renewables, LLC",
    AZPS = "Arizona Public Service Company",
    BANC = "Balancing Authority of Northern California",
    BPAT = "Bonneville Power Administration",
    CHPD = "Public Utility District No. 1 of Chelan County",
    CISO = "California Independent System Operator",
    CPLE = "Duke Energy Progress East",
    CPLW = "Duke Energy Progress West",
    DEAA = "Arlington Valley, LLC",
    DOPD = "PUD No. 1 of Douglas County",
    DUK = "Duke Energy Carolinas",
    EEI = "Electric Energy, Inc.",
    EPE = "El Paso Electric Company",
    ERCO = "Electric Reliability Council of Texas, Inc.",
    FMPP = "Florida Municipal Power Pool",
    FPC = "Duke Energy Florida, Inc.",
    FPL = "Florida Power & Light Co.",
    GCPD = "Public Utility District No. 2 of Grant County, Washington",
    GLHB = "GridLiance",
    GRID = "Gridforce Energy Management, LLC",
    GRIF = "Griffith Energy, LLC",
    GRMA = "Gila River Power, LLC",
    GVL = "Gainesville Regional Utilities",
    GWA = "NaturEner Power Watch, LLC",
    HGMA = "New Harquahala Generating Company, LLC",
    HST = "City of Homestead",
    IID = "Imperial Irrigation District",
    IPCO = "Idaho Power Company",
    ISNE = "ISO New England",
    JEA = "JEA",
    LDWP = "Los Angeles Department of Water and Power",
    LGEE = "Louisville Gas and Electric Company and Kentucky Utilities Company",
    MISO = "Midcontinent Independent System Operator, Inc.",
    NEVP = "Nevada Power Company",
    NSB = "Utilities Commission of New Smyrna Beach",
    NWMT = "NorthWestern Corporation",
    NYIS = "New York Independent System Operator",
    OVEC = "Ohio Valley Electric Corporation",
    PACE = "PacifiCorp East",
    PACW = "PacifiCorp West",
    PGE = "Portland General Electric Company",
    PJM = "PJM Interconnection, LLC",
    PNM = "Public Service Company of New Mexico",
    PSCO = "Public Service Company of Colorado",
    PSEI = "Puget Sound Energy, Inc.",
    SC = "South Carolina Public Service Authority",
    SCEG = "Dominion Energy South Carolina, Inc.",
    SCL = "Seattle City Light",
    SEC = "Seminole Electric Cooperative",
    SEPA = "Southeastern Power Administration",
    SOCO = "Southern Company Services, Inc. - Trans",
    SPA = "Southwestern Power Administration",
    SRP = "Salt River Project Agricultural Improvement and Power District",
    SWPP = "Southwest Power Pool",
    TAL = "City of Tallahassee",
    TEC = "Tampa Electric Company",
    TEPC = "Tucson Electric Power",
    TIDC = "Turlock Irrigation District",
    TPWR = "City of Tacoma, Department of Public Utilities, Light Division",
    TVA = "Tennessee Valley Authority",
    WACM = "Western Area Power Administration - Rocky Mountain Region",
    WALC = "Western Area Power Administration - Desert Southwest Region",
    WAUE = "Western Area Power Administration - Upper Great Plains East",
    WAUW = "Western Area Power Administration - Upper Great Plains West",
    WWA = "NaturEner Wind Watch, LLC",
    YAD = "Alcoa Power Generating, Inc. - Yadkin Division",
    AESO = "Alberta Electric System Operator",
    BCHA = "British Columbia Hydro and Power Authority",
    HQT = "Hydro-Quebec TransEnergie",
    IESO = "Ontario IESO",
    MHEB = "Manitoba Hydro",
    NBSO = "New Brunswick System Operator",
    SPC = "Saskatchewan Power Corporation",
    CEN = "Centro Nacional de Control de Energia",
    CFE = "Comision Federal de Electricidad",
}
