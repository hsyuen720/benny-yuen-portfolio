export default {
  "*.ts?(x)": "tsc -p tsconfig.json --noEmit",
  "*.{js,jsx,ts,tsx}": "eslint --quiet --fix",
  "*.{json,md,mdx,yml}": "prettier --write --ignore-unknown",
};
