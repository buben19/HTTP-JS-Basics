const { MongoClient } = require("mongodb");

// docker run -p 27017:27017 mongo
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "myProject";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("users");
  await collection.insertOne({
    firstName: "John",
    lastName: "Doe",
    birthday: new Date("1990-01-01 00:00:00Z"),
    address: {
      street: "Test street",
      country: "en"
    },
    testNumber: 42,
    testArray: [1, 2, 3]
  });

  let find = await collection.find();
  await find.forEach(user => {
    console.log(user);
  })

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
