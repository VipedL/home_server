const axios = require("axios");
const PrismaClient = require("../generated/prisma").PrismaClient;

const prisma = new PrismaClient();

async function main() {
  axios
    .get("https://api.porssisahko.net/v1/latest-prices.json")
    .then(async (response) => {
      const prices = response.data.prices;
      
      const pricesInDatabase = await prisma.electricityPrice.findMany();
      prices.forEach(async (price) => {
        if (pricesInDatabase.some((p) => p.startDate === price.startDate)) {
          return;
        }
        await prisma.electricityPrice.create({
          data: {
            price: price.price,
            startDate: price.startDate,
            endDate: price.endDate,
          },
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching electricity prices:", error);
    });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
