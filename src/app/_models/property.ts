export interface Property {
    id?: number;
    town?: string;
    county?: string;
    address: string;
    postocde: string;
    eircode: string;
    propertyType: string;
    sellingType: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    buildingEnergyRating: string;
    description: string;
}
