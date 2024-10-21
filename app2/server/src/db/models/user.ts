import { Schema, model } from 'mongoose';

// Now define the schema using the interface
const userSchema = new Schema({
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    joinedAt: { type: Date, required: true },

    // user settings
}, {
    collection: "User"
});

// Export the model, ensuring TypeScript knows its type
export const UserModel = model('User', userSchema);
export type UserType = typeof UserModel.schema.obj; // Extract the raw object from schema
