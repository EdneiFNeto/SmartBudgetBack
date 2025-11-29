-- CreateTable
CREATE TABLE "StatusLog" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL DEFAULT 'Server started',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusLog_pkey" PRIMARY KEY ("id")
);
