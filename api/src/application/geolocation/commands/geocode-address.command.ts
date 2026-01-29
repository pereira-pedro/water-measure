export class GeocodeAddressCommand {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly neighborhood?: string | null,
    public readonly state?: string | null,
    public readonly postalCode?: string | null,
    public readonly country?: string | null,
    public readonly number?: string | null,
  ) {}
}
