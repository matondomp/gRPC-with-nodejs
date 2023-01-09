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
const createCategoryProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

let categories = [
    { id: "1", name: "matondo", description: "matondo desc" },
    { id: "1", name: "abel", description: "abel desc" }
]

server.addService(createCategoryProto.CategoryService.service, {
    ListCategory: (_, callback) => {
        console.log('item of cateories =>', categories)
        callback(null, categories)
    }
})

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
)