import { Injectable } from "@nestjs/common";
import crypto from "node:crypto";
import { Prisma, prisma } from "@acme/db";
import { Address, AddressLocation } from "../../domain/address/models/address";
import { AddressRepository } from "../../domain/address/ports/address-repository";
import { TransactionContext } from "../../domain/transaction/ports/transaction-manager";

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  async create(address: Address, tx?: TransactionContext): Promise<Address> {
    const id = address.id ?? crypto.randomUUID();
    const locationSql = buildLocationSql(address.location);
    const db = (tx as Prisma.TransactionClient) ?? prisma;
    const [record] = await db.$queryRaw<AddressRow[]>(Prisma.sql`
      INSERT INTO addresses (id, user_id, street, street_number, neighborhood, city, province, postal_code, country, location, created_at, updated_at)
      VALUES (
        ${id},
        ${address.userId},
        ${address.street},
        ${address.streetNumber},
        ${address.neighborhood},
        ${address.city},
        ${address.province},
        ${address.postalCode},
        ${address.country},
        ${locationSql},
        now(),
        now()
      )
      RETURNING
        id,
        user_id as "userId",
        street,
        street_number as "streetNumber",
        neighborhood,
        city,
        province,
        postal_code as "postalCode",
        country,
        ST_Y(location)::double precision as "latitude",
        ST_X(location)::double precision as "longitude",
        created_at as "createdAt",
        updated_at as "updatedAt";
    `);

    return toDomain(record);
  }

  async update(address: Address, tx?: TransactionContext): Promise<Address> {
    if (!address.id) {
      throw new Error("Address id is required for update");
    }

    const locationSql = buildLocationSql(address.location);
    const db = (tx as Prisma.TransactionClient) ?? prisma;
    const [record] = await db.$queryRaw<AddressRow[]>(Prisma.sql`
      UPDATE addresses
      SET
        user_id = ${address.userId},
        street = ${address.street},
        street_number = ${address.streetNumber},
        neighborhood = ${address.neighborhood},
        city = ${address.city},
        province = ${address.province},
        postal_code = ${address.postalCode},
        country = ${address.country},
        location = ${locationSql},
        updated_at = now()
      WHERE id = ${address.id}
      RETURNING
        id,
        user_id as "userId",
        street,
        street_number as "streetNumber",
        neighborhood,
        city,
        province,
        postal_code as "postalCode",
        country,
        ST_Y(location)::double precision as "latitude",
        ST_X(location)::double precision as "longitude",
        created_at as "createdAt",
        updated_at as "updatedAt";
    `);

    return toDomain(record);
  }

  async delete(id: string, tx?: TransactionContext): Promise<void> {
    const db = (tx as Prisma.TransactionClient) ?? prisma;
    await db.address.delete({ where: { id } });
  }

  async findById(id: string): Promise<Address | null> {
    const records = await prisma.$queryRaw<AddressRow[]>(Prisma.sql`
      SELECT
        id,
        user_id as "userId",
        street,
        street_number as "streetNumber",
        neighborhood,
        city,
        province,
        postal_code as "postalCode",
        country,
        ST_Y(location)::double precision as "latitude",
        ST_X(location)::double precision as "longitude",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM addresses
      WHERE id = ${id}
      LIMIT 1;
    `);

    const record = records[0];
    return record ? toDomain(record) : null;
  }

  async findAll(params?: { userId?: string | null }): Promise<Address[]> {
    const userId = params?.userId ?? null;
    const records = await prisma.$queryRaw<AddressRow[]>(Prisma.sql`
      SELECT
        id,
        user_id as "userId",
        street,
        street_number as "streetNumber",
        neighborhood,
        city,
        province,
        postal_code as "postalCode",
        country,
        ST_Y(location)::double precision as "latitude",
        ST_X(location)::double precision as "longitude",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM addresses
      ${userId ? Prisma.sql`WHERE user_id = ${userId}` : Prisma.empty}
      ORDER BY created_at DESC;
    `);

    return records.map(toDomain);
  }
}

type AddressRow = {
  id: string;
  userId: string;
  street: string;
  streetNumber: string;
  neighborhood: string | null;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
};

function toDomain(record: AddressRow): Address {
  const location = toLocation(record.latitude, record.longitude);

  return Address.create({
    id: record.id,
    userId: record.userId,
    street: record.street,
    streetNumber: record.streetNumber,
    neighborhood: record.neighborhood,
    city: record.city,
    province: record.province,
    postalCode: record.postalCode,
    country: record.country,
    location,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
}

function toLocation(latitude: number | null, longitude: number | null): AddressLocation | null {
  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}

function buildLocationSql(location: AddressLocation | null): Prisma.Sql {
  if (!location) {
    return Prisma.sql`NULL`;
  }

  return Prisma.sql`ST_SetSRID(ST_MakePoint(${location.longitude}, ${location.latitude}), 4326)`;
}
