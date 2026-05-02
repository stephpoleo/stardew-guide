import { ScrollView, Text, View } from "react-native";
import { pixelShadow } from "../components/primitives";
import { I18N, useT } from "../i18n";
import { useTheme } from "../theme";

const PIXEL = "monospace";

export function CaskCalendarScreen({ state }) {
  const { lang, casks, season } = state;
  const t = useT(lang);
  const theme = useTheme();
  const TODAY = 14;
  const MONTH_DAYS = 28;
  const eventsByDay = {};
  casks.forEach((c) => {
    const remainPct = Math.max(0, 1 - c.progress);
    const daysFromNow = Math.ceil(remainPct * 14);
    const day = Math.min(MONTH_DAYS, TODAY + daysFromNow);
    if (!eventsByDay[day]) eventsByDay[day] = [];
    eventsByDay[day].push(c);
  });

  const seasonGlyph = { spring: "🌸", summer: "☀️", fall: "🍂", winter: "❄️" }[season];
  const misc = I18N[lang].misc;

  const cellSize = 40; // approximate; uses flex 1

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14, gap: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 18, fontWeight: "800", color: theme.ink }}>
          {t("cask.monthView")}
        </Text>
        <Text style={{ fontFamily: PIXEL, fontSize: 11, color: theme.ink2 }}>
          {seasonGlyph} {t(`season.${season}`)}
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
        {Array.from({ length: MONTH_DAYS }, (_, i) => {
          const day = i + 1;
          const isToday = day === TODAY;
          const isPast = day < TODAY;
          const events = eventsByDay[day] || [];
          const hasReady =
            events.some((e) => e.progress >= 1) ||
            (day === TODAY && casks.some((c) => c.progress >= 1));
          return (
            <View
              key={day}
              style={[
                {
                  width: `${100 / 7}%`,
                  aspectRatio: 1,
                  padding: 1.5,
                },
              ]}
            >
              <View
                style={[
                  {
                    flex: 1,
                    backgroundColor: isPast ? theme.surface2 : theme.surface,
                    borderWidth: isToday ? 2 : 1,
                    borderColor: isToday ? theme.accent : theme.line,
                    padding: 3,
                    opacity: isPast ? 0.5 : 1,
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
                {events.length > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 1,
                      marginTop: "auto",
                      flexWrap: "wrap",
                    }}
                  >
                    {events.slice(0, 3).map((e, idx) => (
                      <View
                        key={idx}
                        style={{
                          width: 6,
                          height: 6,
                          backgroundColor: e.progress >= 1 ? theme.accent : theme.gold,
                          borderWidth: 1,
                          borderColor: theme.ink,
                        }}
                      />
                    ))}
                  </View>
                ) : null}
                {isToday && hasReady ? (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 10,
                      height: 10,
                      backgroundColor: theme.danger,
                      borderWidth: 1,
                      borderColor: theme.ink,
                      borderRadius: 5,
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
      {Object.keys(eventsByDay)
        .sort((a, b) => +a - +b)
        .map((day) => (
          <View
            key={day}
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
                width: 36,
                alignItems: "center",
                backgroundColor: theme.ink,
                paddingVertical: 4,
                borderRadius: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 8,
                  letterSpacing: 1.0,
                  color: theme.surface,
                }}
              >
                {misc.day3}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: "800", color: theme.surface }}>{day}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              {eventsByDay[day].map((e) => (
                <Text key={e.uid} style={{ fontSize: 12, fontWeight: "700", color: theme.ink }}>
                  🪵 {e.label[lang]}
                  {e.progress >= 1 ? (
                    <Text style={{ color: theme.accent }}>  ● {t("cask.ready")}</Text>
                  ) : null}
                </Text>
              ))}
            </View>
          </View>
        ))}
      {Object.keys(eventsByDay).length === 0 ? (
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
