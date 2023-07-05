-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_carId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_carId_fkey";

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
