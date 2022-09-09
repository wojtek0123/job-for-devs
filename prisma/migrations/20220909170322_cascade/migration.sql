-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_offerId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
