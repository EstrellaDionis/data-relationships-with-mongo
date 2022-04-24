const mongoose = require("mongoose");
const { Schema } = mongoose; //destructuring so we dont have to write mongoose.Schema.Types.ObjectId in our products array. And also, dont have to write mongoose.Schema instead, we can just use Schema

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

//ref option is important! It is what tells Mongoose which model to use during population.
//basically, we need to set ref to be the name of the model that we set up already that we're referencing. It makes it significantly easier to query our database
const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

//ran this to have products in the database
// Product.insertMany([
//   { name: "Goddess Melon", price: 4.99, season: "Summer" },
//   { name: "Sugar Baby Watermelon", price: 4.99, season: "Summer" },
//   { name: "Asparagus", price: 4.99, season: "Spring" },
// ]);

//1)creates our farm
//2)awaits our Product by the name of 'Goddess Melon'
//3)push the melon into the farm
//4)saves the entire process into database

// const makeFarm = async () => {
//   const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
//   const melon = await Product.findOne({ name: "Goddess Melon" });
//   farm.products.push(melon);
//   await farm.save();
//   console.log(farm);
// };

// makeFarm();

//this is to illustrate that mongo is not holding the names of the products but only the ids!
//if you check the console.log(farm) you will see that Full Belly Farms has no information about the products themsleves but instead, has ObjectIds.
//it has two because we started Goddess Melon and now, Sugar Baby Watermelon into it
const addProduct = async () => {
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
};

addProduct();
