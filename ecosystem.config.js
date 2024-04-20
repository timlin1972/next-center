module.exports = {
    apps: [
        {
            name: "next-center",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 9290",
            watch: false,
        },
    ],
};
