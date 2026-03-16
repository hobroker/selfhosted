export default {
  "*.{md,yaml}": "prettier --write",
  "apps/**/README.md": () => "npm run generate",
};
