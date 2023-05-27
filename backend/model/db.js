const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb+srv://yoshi:Lx46fLfCye9P43C3@cluster1.ifjgmjx.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log('connected to mongoDB');
}

module.exports = mongoose;
