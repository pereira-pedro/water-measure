export type UpdateAddressCommand = {
  id: string;
  userId?: string;
  street?: string;
  streetNumber?: string;
  neighborhood?: string | null;
  city?: string;
  province?: string | null;
  postalCode?: string | null;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
};
