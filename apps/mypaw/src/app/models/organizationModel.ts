export interface Organization {
  id: string;
  name: string;
  street_name: string;
  street_number: string;
  postal_code: string;
  country: string;
  city: string;
  role: string;
  premium: boolean;
}

export interface DataForm {
  name: string;
}
