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

// 1) creating schemas that our db's will be using
const userSchema = new Schema({
  username: String,
  age: Number,
});
// 1)
const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" }, //remember that this is saying, give us the id from 'User'
});

// 2) make models that schema's will be fed into
const User = mongoose.model("User", userSchema); //model will be 'User' and it will be fed the userSchema(like blueprints)
const Tweet = mongoose.model("Tweet", tweetSchema); // model will be 'Tweet' and it will be fed the tweetSchema

// 3) creating user and tweets

// const makeTweets = async () => {
//   const user = new User({ username: "dionis8534", age: 32 }); //creating a user
//   //   const user = await User.findOne({ username: "chickenfan99" }); //this was done AFTER we created our user(after we ran node)
//   //   const tweet1 = new Tweet({ text: "omg I love my chicken family!", likes: 0 }); //tweet related to the first user
//   const tweet4 = new Tweet({
//     text: "5th time but with my username",
//     likes: 1000000,
//   });
//   tweet4.user = user; //this is associating tweet2 and the user go together and naming it user by adding on the tweet into the user. If we don't do this, they will just be stored seperately and we dont want that.
//   user.save(); //saving the user
//   tweet4.save(); //saving the tweet
// };

// makeTweets();

// .populate('user') is NOT the name of the mode, it's the name of the FIELD in tweetSchema
// by using populate, we see the user AND we can be even more specific and instead of pulling everything related to each user, we can say, like below, go into the user and only give me the username
const findTweet = async () => {
  const t = await Tweet.find({}).populate("user");
  console.log(t);
};

findTweet();
