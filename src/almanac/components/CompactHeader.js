import { Pressable, Text, View } from "react-native";
import { useTheme } from "../theme";
import { LangToggle, SeasonSegmented, pixelShadow } from "./primitives";

const PIXEL = "monospace";

export function CompactHeader({
  lang,
  setLang,
  season,
  setSeason,
  currentDay,
  setCurrentDay,
  t,
  onSearchClick,
  searchActive,
  showSeason = true,
  title,
  onBack,
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.surface2,
        borderBottomWidth: 2,
        borderBottomColor: theme.ink,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, minHeight: 28 }}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            style={[
              {
                backgroundColor: theme.surface,
                borderWidth: 2,
                borderColor: theme.ink,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 2,
              },
              pixelShadow(theme.ink, 2),
            ]}
          >
            <Text style={{ fontFamily: PIXEL, fontSize: 12, color: theme.ink, fontWeight: "700" }}>←</Text>
          </Pressable>
        ) : (
          <Text style={{ fontSize: 16 }}>🌾</Text>
        )}
        <View style={{ flex: 1, minWidth: 0 }}>
          {title ? (
            <Text
              numberOfLines={1}
              style={{ fontSize: 15, fontWeight: "800", color: theme.ink }}
            >
              {title}
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: PIXEL,
                  fontSize: 9,
                  letterSpacing: 1.0,
                  color: theme.ink3,
                  textTransform: "uppercase",
                }}
              >
                {t("appName")}
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 13, fontWeight: "800", color: theme.ink, marginTop: 1 }}
              >
                {t("greeting")}
              </Text>
            </>
          )}
        </View>
        <Pressable
          onPress={onSearchClick}
          style={{
            backgroundColor: searchActive ? theme.ink : "transparent",
            borderWidth: 1.5,
            borderColor: theme.ink3,
            width: 28,
            height: 28,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 13, color: searchActive ? theme.surface : theme.ink }}>🔍</Text>
        </Pressable>
        <LangToggle lang={lang} setLang={setLang} />
      </View>

      {showSeason ? (
        <View style={{ marginTop: 8, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <SeasonSegmented season={season} setSeason={setSeason} t={t} />
          </View>
          <DayStepper currentDay={currentDay} setCurrentDay={setCurrentDay} t={t} />
        </View>
      ) : null}
    </View>
  );
}

function DayStepper({ currentDay, setCurrentDay, t }) {
  const theme = useTheme();
  const safeDay = Math.max(1, Math.min(28, currentDay ?? 14));
  const stepperBtn = (label, onPress, disabled) => (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderColor: disabled ? theme.line : theme.ink,
        borderRadius: 2,
        backgroundColor: theme.surface,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          fontFamily: PIXEL,
          fontSize: 13,
          fontWeight: "700",
          color: theme.ink,
          lineHeight: 14,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
  return (
    <View style={{ alignItems: "flex-end", gap: 2 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        {stepperBtn("−", () => setCurrentDay(safeDay - 1), safeDay <= 1)}
        <View
          style={{
            minWidth: 56,
            paddingVertical: 2,
            paddingHorizontal: 6,
            borderWidth: 1.5,
            borderColor: theme.ink,
            backgroundColor: theme.surface2,
            borderRadius: 2,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 11,
              color: theme.ink,
              fontWeight: "700",
              letterSpacing: 0.4,
            }}
          >
            {t("day")} {safeDay}
          </Text>
        </View>
        {stepperBtn("+", () => setCurrentDay(safeDay + 1), safeDay >= 28)}
      </View>
    </View>
  );
}
