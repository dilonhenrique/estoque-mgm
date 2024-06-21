import upsert from "./upsert";
import update from "./update";
import create from "./create";
import findByEmail from "./findByEmail";
import findById from "./findById";

export const userRepo = {
  upsert,
  update,
  create,
  findByEmail,
  findById,
};
