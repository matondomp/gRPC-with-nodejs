const grpc = require("@grpc/grpc-js")
const PROTO_PATH = "./proto/createCategory.proto"
var protoLoader = require("@grpc/proto-loader")

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const CategoryService = grpc.loadPackageDefinition(packageDefinition).CategoryService


const client = new CategoryService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
)

client.ListCategory({}, (error, categories) => {
    if (!error) throw error
    console.log('categories', categories);
});
