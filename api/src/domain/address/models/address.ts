export type AddressLocation = {
  latitude: number;
  longitude: number;
};

export class Address {
  private constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public readonly street: string,
    public readonly streetNumber: string,
    public readonly neighborhood: string | null,
    public readonly city: string,
    public readonly province: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly location: AddressLocation | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(params: {
    id?: string | null;
    userId: string;
    street: string;
    streetNumber: string;
    neighborhood: string | null;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    location?: AddressLocation | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): Address {
    const street = params.street.trim();
    const streetNumber = params.streetNumber?.trim() ?? null;
    const neighborhood = params.neighborhood?.trim() ?? null;
    const city = params.city.trim();
    const province = params.province?.trim() ?? null;
    const postalCode = params.postalCode?.trim() ?? null;
    const country = params.country.trim();

    if (!street) {
      throw new Error("Street is required");
    }

    if (!city) {
      throw new Error("City is required");
    }
    if (!province) {
      throw new Error("Province is required");
    }
    if (!postalCode) {
      throw new Error("Postal code is required");
    }

    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? createdAt;

    return new Address(
      params.id ?? null,
      params.userId,
      street,
      streetNumber,
      neighborhood,
      city,
      province,
      postalCode,
      country,
      params.location ?? null,
      createdAt,
      updatedAt,
    );
  }

  static fillable(): (keyof Address)[] {
    return ["street", "streetNumber", "neighborhood", "city", "province", "postalCode", "country", "location"];
  }
}
