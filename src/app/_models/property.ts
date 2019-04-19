import { Photo } from './photo';
import { User } from './user';
import { Star } from './star';

export interface Property {

    id: number;
    town?: string;
    county?: string;
    address: string;
    postcode: string;
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
    mainPhotoUrl: string;
    starred: boolean;
    created_at: Date;
    photos: Photo[];
    user: User;
    stars: Star[];

    forEach(arg0: (element: any) => void);
}
