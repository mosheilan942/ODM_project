// // import mongoose from 'mongoose';
import jsonfile from "./users.json";
// import mongoose, { Schema, Document, model, connect } from 'mongoose';

// console.log(jsonfile.users);


// async function connectToDatabase() {
// //     try {
// //         await mongoose.connect('mongodb://127.0.0.1:27017')
// // console.log('Connected to MongoDB');
// //     } catch (error) {
// //         console.error('Error connecting to MongoDB:', error);
// //     }
// }



// interface User {
// username: string;
// password: string;
// }
// const UserSchema = new Schema<User>({
// username: {
// type: String,
// required: true
// },
// password: {
// type: String,
// required: true
// },
// }, { timestamps: true });

// const User = model<User>('User', UserSchema);

// run().catch(err => console.log(err));
// // const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);

// async function run() {
//     // 4. Connect to MongoDB
//     await connect('mongodb://127.0.0.1:27017/test');
  
//     const user = new User({
//       username: 'Bill',
//       password: 'bill@initech.com'
//     //   avatar: 'https://i.imgur.com/dM7Thhn.png'
//     });
//     await user.save();
  
//     // console.log(user.email); // 'bill@initech.com'
//   }

//   connectToDatabase();

import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: string;
  password: string;
//   avatar?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
//   avatar: String
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/test');

  jsonfile.users.map(async (person) => {
    const user = new User({
        email: person.email,
        password: person.password,
        // avatar: 'https://i.imgur.com/dM7Thhn.png'
      });
    await user.save();
  })
//   const user = new User({
//     name: 'Bill',
//     email: 'bill@initech.com',
//     avatar: 'https://i.imgur.com/dM7Thhn.png'
//   });
//   await user.save();

//   console.log(user.email); // 'bill@initech.com'
}