import create from "./create";
import findById from "./findById";
import remove from "./remove";
import search from "./search";
import setDone from "./setDone";
import unsetDone from "./unsetDone";
import update from "./update";

export const procedureRepo = {
  create,
  update,
  search,
  findById,
  remove,
  setDone,
  unsetDone,
};
