/*
  Warnings:

  - You are about to alter the column `slideTime` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slideTime" INTEGER NOT NULL DEFAULT 5000,
    "showAbsent" BOOLEAN NOT NULL DEFAULT false,
    "showPost" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Settings" ("id", "showAbsent", "showPost", "slideTime") SELECT "id", "showAbsent", "showPost", "slideTime" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
