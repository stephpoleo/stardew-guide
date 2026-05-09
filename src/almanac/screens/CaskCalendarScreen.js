import { ScrollView, Text, View } from "react-native";
import {
  DAYS_PER_SEASON,
  fromAbsDay,
  progressFor,
  readyAbsDay,
  toAbsDay,
} from "../calendar";
import { pixelShadow } from "../components/primitives";
import { I18N, useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function CaskCalendarScreen({ state }) {
  const { lang, casks, season, currentDay, currentAbsDay } = state;
  const t = useT(lang);
  const theme = useTheme();
  const misc = I18N[lang].misc;
  const seasonGlyph = { spring: "🌸", summer: "☀️", fall: "🍂", winter: "❄️" }[season];

  // For each cask, figure out where its ready day lands. If it falls inside the
  // currently visible season, key it by day-of-season for the grid. Otherwise
  // include it in an "other months" bucket for the upcoming list.
  const readyInThisSeason = {};
  const readyElsewhere = [];
  casks.forEach((c) => {
    const ready = readyAbsDay(c);
    const info = fromAbsDay(ready);
    if (info.season === season && info.yearOffset === 0) {
      if (!readyInThisSeason[info.day]) readyInThisSeason[info.day] = [];
      readyInThisSeason[info.day].push(c);
    } else {
      readyElsewhere.push({ cask: c, info, ready });
    }
  });
  readyElsewhere.sort((a, b) => a.ready - b.ready);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
          {t("cask.monthView")}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2 }}>
          {seasonGlyph} {t(`season.${season}`)} · {t("day")} {currentDay}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <View key={d} style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 10,
                letterSpacing: 1.0,
                color: theme.ink2,
                fontWeight: "700",
              }}
            >
              {d}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {Array.from({ length: DAYS_PER_SEASON }, (_, i) => {
          const day = i + 1;
          const dayAbs = toAbsDay(season, day);
          const isToday = day === currentDay;
          const isPast = dayAbs < currentAbsDay;
          const readyEvents = readyInThisSeason[day] || [];
          // Also mark days where casks are mid-aging that pass through
          const agingCount = casks.reduce((acc, c) => {
            if (dayAbs > c.startAbsDay && dayAbs < readyAbsDay(c)) return acc + 1;
            return acc;
          }, 0);
          return (
            <View
              key={day}
              style={{
                width: `${100 / 7}%`,
                aspectRatio: 1,
                padding: 1.5,
              }}
            >
              <View
                style={[
                  {
                    flex: 1,
                    backgroundColor: isPast ? theme.surface2 : theme.surface,
                    borderWidth: isToday ? 2 : 1,
                    borderColor: isToday ? theme.accent : theme.line,
                    padding: 3,
                    opacity: isPast ? 0.55 : 1,
                  },
                  isToday ? pixelShadow(theme.ink, 2) : null,
                ]}
              >
                <Text
                  style={{
                    fontFamily: PIXEL,
                    fontSize: 10,
                    letterSpacing: 0.2,
                    fontWeight: isToday ? "700" : "400",
                    color: isToday ? theme.accent : theme.ink2,
                  }}
                >
                  {day}
                </Text>
                {readyEvents.length > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 1,
                      marginTop: "auto",
                      flexWrap: "wrap",
                    }}
                  >
                    {readyEvents.slice(0, 3).map((c, idx) => (
                      <View
                        key={idx}
                        style={{
                          width: 6,
                          height: 6,
                          backgroundColor: theme.accent,
                          borderWidth: 1,
                          borderColor: theme.ink,
                        }}
                      />
                    ))}
                  </View>
                ) : agingCount > 0 ? (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor: theme.gold,
                      marginTop: "auto",
                      borderWidth: 1,
                      borderColor: theme.ink,
                    }}
                  />
                ) : null}
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ flexDirection: "row", gap: 12, paddingVertical: 4, flexWrap: "wrap" }}>
        <LegendItem color={theme.accent} label={misc.ready} />
        <LegendItem color={theme.gold} label={misc.aging} />
        <LegendItem color="transparent" border={theme.accent} label={t("cask.today")} />
      </View>

      <Text
        style={{
          fontFamily: PIXEL,
          fontSize: 10,
          letterSpacing: 1.2,
          color: theme.ink2,
          textTransform: "uppercase",
          paddingHorizontal: 2,
        }}
      >
        {misc.upcoming}
      </Text>

      {/* Ready in this season */}
      {Object.keys(readyInThisSeason)
        .sort((a, b) => +a - +b)
        .map((day) => (
          <UpcomingRow
            key={`this-${day}`}
            theme={theme}
            label={`${t("day")} ${day}`}
            year={null}
            casks={readyInThisSeason[day]}
            currentAbsDay={currentAbsDay}
            lang={lang}
            t={t}
            misc={misc}
          />
        ))}

      {/* Ready in other seasons */}
      {readyElsewhere.map(({ cask, info }) => {
        const yearTag =
          info.yearOffset === 0
            ? ""
            : info.yearOffset > 0
            ? ` (+${info.yearOffset}${misc.yearShort})`
            : ` (${info.yearOffset}${misc.yearShort})`;
        return (
          <UpcomingRow
            key={`else-${cask.uid}`}
            theme={theme}
            label={`${t(`season.${info.season}`).slice(0, 3)} · ${t("day")} ${info.day}${yearTag}`}
            year={info.yearOffset}
            casks={[cask]}
            currentAbsDay={currentAbsDay}
            lang={lang}
            t={t}
            misc={misc}
          />
        );
      })}

      {casks.length === 0 ? (
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 12,
            color: theme.ink2,
            textAlign: "center",
            paddingVertical: 20,
          }}
        >
          {t("cask.empty")}
        </Text>
      ) : null}
    </ScrollView>
  );
}

function UpcomingRow({ theme, label, casks, currentAbsDay, lang, t, misc }) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 10,
          paddingVertical: 8,
          backgroundColor: theme.surface,
          borderWidth: 2,
          borderColor: theme.ink,
          borderRadius: 2,
          alignItems: "center",
        },
        pixelShadow(theme.line, 2),
      ]}
    >
      <View
        style={{
          minWidth: 60,
          alignItems: "center",
          backgroundColor: theme.ink,
          paddingVertical: 4,
          paddingHorizontal: 6,
          borderRadius: 2,
        }}
      >
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 9,
            letterSpacing: 0.6,
            color: theme.surface,
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        {casks.map((c) => {
          const p = progressFor(c, currentAbsDay);
          return (
            <Text key={c.uid} style={{ fontSize: 12, fontWeight: "700", color: theme.ink }}>
              🪵 {c.label[lang]}
              {p >= 1 ? (
                <Text style={{ color: theme.accent }}>  ● {t("cask.ready")}</Text>
              ) : null}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

function LegendItem({ color, border, label }) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: color,
          borderWidth: border ? 2 : 1,
          borderColor: border || theme.ink,
        }}
      />
      <Text style={{ fontFamily: PIXEL, fontSize: 10, color: theme.ink2, letterSpacing: 0.4 }}>
        {label}
      </Text>
    </View>
  );
}
