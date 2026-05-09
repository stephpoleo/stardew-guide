// In-game calendar arithmetic. The world year is 4 seasons × 28 days = 112
// days, indexed from 1. Seasons are ordered spring → summer → fall → winter.
//
// "absDay" is an absolute day number that may extend before day 1 (e.g.
// for casks started before the player adopted the in-game-day system, or
// for casks that ripen next year). fromAbsDay() normalizes any absDay to
// a {season, day, yearOffset} triple where yearOffset is 0 for the
// reference year, +1 for next year, −1 for last year, etc.

export const SEASON_LIST = ["spring", "summer", "fall", "winter"];
export const SEASON_INDEX = { spring: 0, summer: 1, fall: 2, winter: 3 };
export const DAYS_PER_SEASON = 28;
export const DAYS_PER_YEAR = SEASON_LIST.length * DAYS_PER_SEASON;
export const CASK_DURATION_DAYS = 56; // raw → silver → gold → iridium

export function toAbsDay(season, dayOfSeason) {
  return SEASON_INDEX[season] * DAYS_PER_SEASON + dayOfSeason;
}

export function fromAbsDay(abs) {
  let yearOffset = 0;
  let normalized = abs;
  while (normalized < 1) {
    normalized += DAYS_PER_YEAR;
    yearOffset -= 1;
  }
  while (normalized > DAYS_PER_YEAR) {
    normalized -= DAYS_PER_YEAR;
    yearOffset += 1;
  }
  const seasonIdx = Math.floor((normalized - 1) / DAYS_PER_SEASON);
  const day = ((normalized - 1) % DAYS_PER_SEASON) + 1;
  return { season: SEASON_LIST[seasonIdx], day, yearOffset };
}

export function progressFor(cask, currentAbsDay) {
  const dur = cask.durationDays || CASK_DURATION_DAYS;
  const elapsed = currentAbsDay - cask.startAbsDay;
  return Math.max(0, Math.min(1, elapsed / dur));
}

export function readyAbsDay(cask) {
  const dur = cask.durationDays || CASK_DURATION_DAYS;
  return cask.startAbsDay + dur;
}

// Stage based on elapsed in-game days within the cask. Same thresholds as
// the original real-time demo: silver < 14, gold < 35, iridium ≥ 35.
export function stageFor(cask, currentAbsDay) {
  const elapsed = Math.max(0, currentAbsDay - cask.startAbsDay);
  if (elapsed >= 35) return "iridium";
  if (elapsed >= 14) return "gold";
  return "silver";
}
