import { AmbassadorKey } from "@alveusgg/data/src/ambassadors/core"

const ambassadorImagePositions: Partial<{
    [key in AmbassadorKey]: string
}> = {
    stompy: "50% 30%",
    tico: "50% 0%",
    miley: "50% 0%",
    mia: "50% 10%",
    coconut: "50% 30%",
    oliver: "50% 0%",
    nugget: "50% 0%",
    henrique: "50% 20%",
    patchy: "50% 100%",
    fenn: "50% 35%",
    marty: "50% 100%",
    momo: "50% 0%",
};

export const getAmbassadorImagePosition = (ambassador: AmbassadorKey): string | undefined => ambassadorImagePositions[ambassador];
