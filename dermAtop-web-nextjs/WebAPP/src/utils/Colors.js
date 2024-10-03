export const addTransparency = (color, transparency) => {
  const rgbaColor = color
    .replace("rgb", "rgba")
    .replace(")", `, ${transparency})`);
  return rgbaColor;
};