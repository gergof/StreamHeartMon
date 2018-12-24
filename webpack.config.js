const path=require("path");

module.exports={
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    "raw-loader"
                ]
            }
        ]
    }
};