import { limitlesspc } from "@limitlesspc/eslint-config";

export default limitlesspc({
  type: "lib",
  typescript: {
    tsconfigPath: "tsconfig.json",
  },
});
