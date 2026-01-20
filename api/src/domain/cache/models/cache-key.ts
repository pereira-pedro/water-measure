export class CacheKey {
  private constructor(public readonly value: string) {}

  static create(value: string): CacheKey {
    if (!value?.trim()) {
      throw new Error("CacheKey value is required");
    }

    return new CacheKey(value.trim());
  }

  static fromParts(...parts: string[]): CacheKey {
    const normalized = parts.map((part) => part.trim()).filter(Boolean).join(":");
    return CacheKey.create(normalized);
  }

  toString(): string {
    return this.value;
  }
}
