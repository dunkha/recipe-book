import { type } from "os";

export function haeMittatyyppi(measurementType) {
    switch (measurementType) {
        case "COUNT":
            return "kpl";
        case "TEASPOON":
            return "tl";
        case "SPOON":
            return "rkl";
        case "MILLIGRAM":
            return "mg";
        case "GRAM":
            return "g";
        case "KILOGRAM":
            return "kg";
        case "MILLILITER":
            return "ml";
        case "CENTTILITER":
            return "cl";
        case "DECILITER":
            return "dl";
        case "LITER":
            return "l";
        case "CAN":
            return "tlk";
        case "PORTION":
            return "annosta";
        default:
            return "";
    }
}

export function haeMittatyypit() {
    return [
        {
            value: "COUNT",
            name: "kappaletta"
        },
        {
            value: "TEASPOON",
            name: "teelusikallista"
        },
        {
            value: "SPOON",
            name: "lusikallista"
        },
        {
            value: "MILLIGRAM",
            name: "milligrammaa"
        },
        {
            value: "GRAM",
            name: "grammaa"
        },
        {
            value: "KILOGRAM",
            name: "kilogrammaa"
        },
        {
            value: "MILLILITER",
            name: "millilitraa"
        },
        {
            value: "CEINTTILITER",
            name: "senttilitraa"
        },
        {
            value: "DECILITER",
            name: "desilitraa"
        },
        {
            value: "LITER",
            name: "litraa"
        },
        {
            value: "CAN",
            name: "tölkkiä"
        },
        {
            value: "PORTION",
            name: "annosta"
        }
    ]
}

export function convertDecimal(value) {
    if (!value) {
        return null;
    }

    if (typeof value !== "string" ) {
        value = String(value);
    }

    return value.replace('.', ',');
}

export const compareIntegers = (a, b) => {
    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};