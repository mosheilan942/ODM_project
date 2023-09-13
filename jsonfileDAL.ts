import jsonfile from "jsonfile";
import path from "path";
import { handleJsonfileError } from "../utils/handleErrors";
import mongoose, { Schema, Document, Model, connect, Error } from 'mongoose';
import { log } from "console";
import { promises } from "dns";
// const client = new MongoClient("mongodb://127.0.0.1:27017");


export interface User extends Document {
  email: string;
  password: string;
  user_id?: string;
  product?:string;
};

const UserSchema: Schema<User> = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  user_id: { type: String, required: false },
});

const UserModel: Model<User> = mongoose.model<User>('user', UserSchema);
type CollectionResult = Promise<Record<string, unknown>[] | Error>;

export const getCollectionFromJsonFile = async (
): Promise<User[]> => {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    const data = await UserModel.find().exec();
    return data
  } catch (error) {
    throw error
  } finally {
    await mongoose.connection.close();
  }
}


export const getUserByid = async (id: string): Promise<User> => {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    const data = await UserModel.findById(id).exec();
    return data!
  } catch (error) {
    throw error
  } finally {
    await mongoose.connection.close();
  }
}


export const addUserToDb = async (person: User): Promise<string> => {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    const { email, password } = person;
    const user = new UserModel({ email, password });
    await user.save();
    return "the user add good!";
  } catch (error) {
    throw handleJsonfileError(error);
  } finally {
    await mongoose.connection.close();
  }

};


export const updateUserById = async (personID: string, person: User): Promise<string> => {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    const filter = { _id: personID }
    const update = person
    console.log("personID:", personID);
    console.log("filter:", filter);
    console.log("update:", update);

    const user = await UserModel.findOneAndUpdate(filter, update);
    console.log("Updated user:", user);

    return "the user app to data!";
  } catch (error) {
    throw handleJsonfileError(error);
  } finally {
    await mongoose.connection.close();
  }
};


export const deleteUserById = async (personID: string): Promise<string> => {
  try {
    await connect('mongodb://127.0.0.1:27017/test');
    const filter = { _id: personID }

    console.log("personID:", personID);
    console.log("filter:", filter);

    const user = await UserModel.findOneAndDelete(filter);
    console.log("deleted user:", user);

    return "the user deleted!";
  } catch (error) {
    throw handleJsonfileError(error);
  } finally {
    await mongoose.connection.close();
  }
};


// const DB_URL = path.join(__dirname, "../../DB/users.json");

// type CollectionResult = Promise<Record<string, unknown>[] | Error>;

// export const getCollectionFromJsonFile = async (
//   collection: string
// ): CollectionResult => {
//   try {
//     const { [collection]: data } = await jsonfile.readFile(DB_URL);
//     return data;
//   } catch (error) {
//     return handleJsonfileError(error);
//   }
// };

// type DatabaseResult = Promise<Record<string, unknown> | Error>;
// export const getDatabase = async (): DatabaseResult => {
//   try {
//     const data = await jsonfile.readFile(DB_URL);
//     return data;
//   } catch (error) {
//     return handleJsonfileError(error);
//   }
// };

