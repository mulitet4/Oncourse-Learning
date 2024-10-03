-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "correctTest" TEXT NOT NULL,
    "correctDiagnosis" TEXT NOT NULL
);
