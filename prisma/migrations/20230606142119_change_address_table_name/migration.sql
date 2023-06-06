/*
  Warnings:

  - You are about to drop the `adresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adresses" DROP CONSTRAINT "adresses_userId_fkey";

-- DropTable
DROP TABLE "adresses";

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "street" VARCHAR(127) NOT NULL,
    "number" VARCHAR(8) NOT NULL,
    "complement" VARCHAR(50) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_key" ON "addresses"("userId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
