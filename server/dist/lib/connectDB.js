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
exports.default = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("./env"));
const URI = env_1.default.MONGODB_URI;
const clientOptions = {
    dbName: env_1.default.MONGODB_NAME,
    retryWrites: true,
    writeConcern: {
        w: "majority",
    },
    appName: env_1.default.CLUSTER_NAME,
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(URI, clientOptions);
            yield ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.admin().command({ ping: 1 }));
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            console.log("MongoDB connected");
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
