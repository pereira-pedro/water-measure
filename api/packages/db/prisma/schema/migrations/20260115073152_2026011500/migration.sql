-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_meter_measures" (
    "id" UUID NOT NULL,
    "water_meter_id" UUID NOT NULL,
    "collected_counter" BIGINT NOT NULL,
    "collected_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "water_meter_measures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_meters" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,
    "registration_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "water_meters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_addresses_user_id" ON "addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_water_meter_measures_water_meter_id" ON "water_meter_measures"("water_meter_id");

-- CreateIndex
CREATE INDEX "idx_water_meter_measures_collected_at" ON "water_meter_measures"("collected_at");

-- CreateIndex
CREATE INDEX "idx_water_meters_user_id" ON "water_meters"("user_id");

-- CreateIndex
CREATE INDEX "idx_water_meters_address_id" ON "water_meters"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_water_meters_registration_number" ON "water_meters"("registration_number");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_meter_measures" ADD CONSTRAINT "water_meter_measures_water_meter_id_fkey" FOREIGN KEY ("water_meter_id") REFERENCES "water_meters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_meters" ADD CONSTRAINT "water_meters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_meters" ADD CONSTRAINT "water_meters_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
