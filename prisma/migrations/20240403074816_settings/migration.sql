-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slideTime" TEXT NOT NULL,
    "showAbsent" BOOLEAN NOT NULL DEFAULT false,
    "showPost" BOOLEAN NOT NULL DEFAULT false
);
