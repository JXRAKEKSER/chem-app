-- CreateTable
CREATE TABLE "PredictionModel" (
    "id" SERIAL NOT NULL,
    "formula" TEXT NOT NULL,
    "prediction" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PredictionModel_pkey" PRIMARY KEY ("id")
);
