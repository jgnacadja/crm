module.exports = {
    module: {
        rules: [
            // ... other rules omitted

            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            data: `@import "@/variable.scss";`,
                        },
                    },
                ],
            },
        ],
    },
    configureWebpack: {
        devtool: "source-map",
    },
};