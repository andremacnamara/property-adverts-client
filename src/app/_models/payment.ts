export interface Payment {
    town?: string;
    county?: string;
    billing_address: string;
    cardnumber: string;
    month: string;
    year: string;
    cvv: string;
}
