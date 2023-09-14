"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // import mongoose from 'mongoose';
const users_json_1 = __importDefault(require("./users.json"));
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
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    //   avatar: String
});
// 3. Create a Model.
const User = (0, mongoose_1.model)('User', userSchema);
run().catch(err => console.log(err));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test');
        users_json_1.default.users.map((person) => __awaiter(this, void 0, void 0, function* () {
            const user = new User({
                email: person.email,
                password: person.password,
                // avatar: 'https://i.imgur.com/dM7Thhn.png'
            });
            yield user.save();
        }));
        //   const user = new User({
        //     name: 'Bill',
        //     email: 'bill@initech.com',
        //     avatar: 'https://i.imgur.com/dM7Thhn.png'
        //   });
        //   await user.save();
        //   console.log(user.email); // 'bill@initech.com'
    });
}
