#!/usr/bin/env node
import dotenv from "dotenv";
import connectDB from "../db/db.js";
import Usuario from "../models/Usuario.js";

dotenv.config();

// Uso:
// node migrateUsuariosTarifa.js --all --enable --set-prof=12500 --set-div=5000
// node migrateUsuariosTarifa.js --ids=ID1,ID2 --enable --dry-run

const args = process.argv.slice(2);
const opts = {};
args.forEach((arg) => {
  if (arg.startsWith("--ids=")) opts.ids = arg.split("=")[1].split(",");
  else if (arg === "--all") opts.all = true;
  else if (arg === "--enable") opts.enable = true;
  else if (arg === "--disable") opts.disable = true;
  else if (arg.startsWith("--set-prof=")) opts.setProf = Number(arg.split("=")[1]);
  else if (arg.startsWith("--set-div=")) opts.setDiv = Number(arg.split("=")[1]);
  else if (arg === "--dry-run") opts.dryRun = true;
});

if (!opts.all && !opts.ids) {
  console.log(
    "Uso: node migrateUsuariosTarifa.js --all|--ids=id1,id2 [--enable|--disable] [--set-prof=12500] [--set-div=5000] [--dry-run]",
  );
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB();

    const query = opts.all ? {} : { _id: { $in: opts.ids } };
    const usuarios = await Usuario.find(query);

    if (!usuarios.length) {
      console.log("No se encontraron usuarios para la consulta");
      process.exit(0);
    }

    const cambios = [];

    for (const u of usuarios) {
      const update = {};

      if (opts.enable) {
        update.tarifaDiferenciada = true;
        if (typeof u.montoProfesional === "undefined" || u.montoProfesional === null)
          update.montoProfesional = typeof opts.setProf !== "undefined" ? opts.setProf : 12500;
        if (typeof u.montoDivergente === "undefined" || u.montoDivergente === null)
          update.montoDivergente = typeof opts.setDiv !== "undefined" ? opts.setDiv : 5000;
      }

      if (opts.disable) update.tarifaDiferenciada = false;

      if (typeof opts.setProf !== "undefined") update.montoProfesional = opts.setProf;
      if (typeof opts.setDiv !== "undefined") update.montoDivergente = opts.setDiv;

      if (Object.keys(update).length > 0) {
        cambios.push({
          id: u._id.toString(),
          nombre: u.nombre,
          before: {
            tarifaDiferenciada: u.tarifaDiferenciada,
            montoProfesional: u.montoProfesional,
            montoDivergente: u.montoDivergente,
          },
          after: update,
        });

        if (!opts.dryRun) {
          await Usuario.updateOne({ _id: u._id }, { $set: update });
        }
      }
    }

    console.log(`Se procesaron ${usuarios.length} usuarios.`);
    console.log("Cambios:", JSON.stringify(cambios, null, 2));
    if (opts.dryRun) console.log("Dry run: no se aplicaron cambios.");
    else console.log("Migración completada.");

    process.exit(0);
  } catch (err) {
    console.error("Error durante la migración:", err);
    process.exit(1);
  }
};

run();
