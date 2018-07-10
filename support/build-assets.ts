import * as fs from "fs-extra";
import { compile, registerHelper } from "handlebars";
import * as path from "path";

const data = require("../assets/index") as any; // tslint:disable-line

const templateLiteral = fs.readFileSync(path.join(__dirname, "assets.js.template")).toString();

registerHelper("json", (context) => {
  return JSON.stringify(context);
});

const compiledTemplate = compile(templateLiteral);

const dataFile = compiledTemplate(data);

fs.writeFileSync(path.join(__dirname, "../dist/assets.js"), dataFile);
