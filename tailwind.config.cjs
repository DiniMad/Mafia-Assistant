module.exports = {
    theme: {
        extend: {
            colors: {
                accent: {
                    200: "#ff9d3f",
                    300: "#ef6c00",
                    400: "#b53d00",
                },
                background: {
                    200: "#333333",
                    300: "#272727",
                    400: "#000000",
                }
            },
            animation: {
                "ping-small": "1.5s cubic-bezier(0, 0, 0.2, 1) 0s infinite normal none running ping-small",
                "rotate":".3s forwards rotate"
            },
            keyframes: {
                "ping-small": {
                    "75%, 100%": {
                        transform: "scale(1.2)",
                        opacity: "0",
                    },
                },
                "rotate": {
                    "100%": {
                        transform: "rotate(-360deg)"
                    },
                }
            }
        },
    },
    plugins: [],
};