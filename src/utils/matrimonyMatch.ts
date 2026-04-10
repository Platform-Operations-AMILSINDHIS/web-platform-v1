import type { SpousePreferences, PersonalInfo } from "~/types/forms/matrimony";

export type MatchLabel = "Great Match" | "Good Match" | null;

export interface MatchResult {
  score: number; // 0–4
  label: MatchLabel;
}

function toTotalInches(feet: number | string | undefined, inches: number | string | undefined): number | null {
  const f = Number(feet);
  const i = Number(inches);
  if (isNaN(f) || isNaN(i) || f === 0) return null;
  return f * 12 + i;
}

export function computeMatchScore(
  prefs: SpousePreferences | undefined | null,
  profile: PersonalInfo
): MatchResult {
  if (!prefs) return { score: 0, label: null };

  let score = 0;

  // 1. Height — within ±4 inches of preference
  const prefHeight = toTotalInches(prefs.heightFeet, prefs.heightInches);
  const profileHeight = toTotalInches(profile.heightFeet, profile.heightInches);
  if (prefHeight !== null && profileHeight !== null && Math.abs(prefHeight - profileHeight) <= 4) {
    score++;
  }

  // 2. Weight — within ±15 kg of preference
  const prefWeight = Number(prefs.weight);
  const profileWeight = Number(profile.weight);
  if (!isNaN(prefWeight) && !isNaN(profileWeight) && prefWeight > 0 && profileWeight > 0 && Math.abs(prefWeight - profileWeight) <= 15) {
    score++;
  }

  // 3. Complexion — preference substring appears in profile complexion (case-insensitive)
  if (prefs.complexion && profile.complexionAndFeatures) {
    const prefComp = prefs.complexion.toLowerCase().trim();
    const profileComp = profile.complexionAndFeatures.toLowerCase();
    if (prefComp.length > 0 && profileComp.includes(prefComp)) {
      score++;
    }
  }

  // 4. Qualifications — any word (>2 chars) from preference appears in profile qualifications
  if (prefs.qualificationRequirements && profile.qualifications) {
    const prefWords = prefs.qualificationRequirements
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);
    const profileQual = profile.qualifications.toLowerCase();
    if (prefWords.length > 0 && prefWords.some((w) => profileQual.includes(w))) {
      score++;
    }
  }

  const label: MatchLabel =
    score >= 3 ? "Great Match" : score >= 2 ? "Good Match" : null;

  return { score, label };
}
