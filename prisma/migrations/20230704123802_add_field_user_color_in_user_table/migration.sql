/*
  Warnings:

  - Added the required column `userColor` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userColor" TEXT NOT NULL;
