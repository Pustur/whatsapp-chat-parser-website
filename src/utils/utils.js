import * as mime from "mime";
import * as path from "path";

const getMimeType = fileName => mime.getType(path.extname(fileName));

export { getMimeType };
