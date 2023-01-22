import type {FeatureCollection} from "geojson"

import ambassadorDataJson from "../assets/ambassadors.json"
import facilityDataJson from "../assets/facilities.json"
import enclosureDataJson from "../assets/enclosures.json"
import mapDataJson from "../assets/map.json"

export type Image = {
    src: string
    altText: string
}

export type Ambassador = {
    id: string
    name: string
    species: string
    img: Image
    scientificName: string
    sex: string
    dateOfBirth: string
    iucnStatus: string
    story: string
    conservationMission: string
}

export type AmbassadorData = Array<Ambassador>

export const ambassadorData = ambassadorDataJson as AmbassadorData

export const mapData = mapDataJson as FeatureCollection

export const facilityData = facilityDataJson as Record<string, any>

export const enclosureData = enclosureDataJson as Record<string, any>