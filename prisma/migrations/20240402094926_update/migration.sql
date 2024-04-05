-- CreateTable
CREATE TABLE "Absent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "reason" TEXT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL
);
