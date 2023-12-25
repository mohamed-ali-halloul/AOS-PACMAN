module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                },
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ];
    const plugins = ["@babel/plugin-proposal-class-properties"];

    return {
        presets,
        plugins
    };
};