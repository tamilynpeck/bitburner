/** @param {NS} ns */
/** @param {import(".").NS} ns */

export async function main(ns) {
  let karma = ns.heart.break();
  ns.tprint(
    `Karma: ${Math.round(karma)} ${Math.round((karma / -54000) * 100)}%`
  );
}
