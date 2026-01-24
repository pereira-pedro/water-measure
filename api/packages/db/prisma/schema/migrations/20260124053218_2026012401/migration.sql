/*
  Warnings:

  - You are about to drop the column `token` on the `auth_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_hash]` on the table `auth_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_hash` to the `auth_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "auth_tokens_token_key";

-- AlterTable
ALTER TABLE "auth_tokens" DROP COLUMN "token",
ADD COLUMN     "token_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auth_tokens_token_hash_key" ON "auth_tokens"("token_hash");
