-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "sitename" TEXT NOT NULL,
    "sitedescription" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);
