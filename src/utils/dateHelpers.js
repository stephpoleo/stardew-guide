const SEASON_LIST = ["Spring", "Summer", "Fall", "Winter"];

function toAbs(year, season, day) {
  return (year - 1) * 112 + SEASON_LIST.indexOf(season) * 28 + (day - 1);
}

function fromAbs(abs) {
  const year = Math.floor(abs / 112) + 1;
  const rem = abs % 112;
  const season = SEASON_LIST[Math.floor(rem / 28)];
  const day = (rem % 28) + 1;
  return { year, season, day };
}

function fmtDate({ year, season, day }) {
  return `${season} ${day}, Yr ${year}`;
}

export { SEASON_LIST, toAbs, fromAbs, fmtDate };
