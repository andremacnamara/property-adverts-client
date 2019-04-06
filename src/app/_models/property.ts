export interface Property {
    id: number;
    town?: string;
    county?: string;
    address: string;
    postocde: string;
    eircode: string;
    property_type: string;
    selling_type: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    building_energy_rating: string;
    description: string;
    user_id: number;
}
