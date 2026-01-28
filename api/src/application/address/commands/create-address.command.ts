export type CreateAddressCommand = {
  userId: string;
  street: string;
  streetNumber: string;
  neighborhood: string | null;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
};
