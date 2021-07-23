const colors = {
    primary: "#272727",
    primaryDark: "#000000",
    primaryLight: "#333333",
    secondary: "#ef6c00",
    secondaryDark: "#b53d00",
    secondaryLight: "#ff9d3f",
    white: "#e5e5e5",
};

export const colorWithOpacity = (color: string, opacity: number) => {
    const opacityHex = (Math.floor(255 * opacity)).toString(16);
    return `${color}${opacityHex}`;
};

export default colors;