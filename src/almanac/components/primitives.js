import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, Text, TextInput, View } from "react-native";
import { SPRITES } from "../sprites";
import { useTheme } from "../theme";

const PIXEL = "monospace";

// Hard pixel-style offset shadow on iOS, soft elevation on Android.
export function pixelShadow(color = "#000", offset = 3) {
  return {
    shadowColor: color,
    shadowOffset: { width: offset, height: offset },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  };
}

export function CardPixel({ children, style, soft = false }) {
  const t = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: t.surface,
          borderWidth: 2,
          borderColor: soft ? t.line : t.ink,
          borderRadius: 2,
        },
        pixelShadow(soft ? t.line : t.ink, soft ? 3 : 4),
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Coin({ value, size = 11 }) {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: t.gold,
          borderWidth: 1,
          borderColor: t.ink,
        }}
      />
      <Text style={{ fontFamily: PIXEL, fontSize: size, color: t.ink, fontWeight: "700", letterSpacing: 0.4 }}>
        {value}
      </Text>
    </View>
  );
}

export function Chip({ children, tone = "neutral", style }) {
  const t = useTheme();
  const tones = {
    neutral: { bg: t.surface2, c: t.ink },
    accent: { bg: t.accent, c: "#fff" },
    water: { bg: t.water, c: "#fff" },
    gold: { bg: t.gold, c: t.ink },
    danger: { bg: t.danger, c: "#fff" },
  };
  const tok = tones[tone];
  return (
    <View
      style={[
        {
          backgroundColor: tok.bg,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderWidth: 1,
          borderColor: t.ink,
          borderRadius: 2,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Text style={{ color: tok.c, fontFamily: PIXEL, fontSize: 9, letterSpacing: 0.5, textTransform: "uppercase" }}>
        {children}
      </Text>
    </View>
  );
}

export function PixelSprite({ id = "x", color = "#b9d46a", emoji, size = 32, bg }) {
  const sprite = SPRITES[id];
  const tileBg = bg || (sprite ? "rgba(255,250,234,0.85)" : color + "55");
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: tileBg,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.18)",
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {sprite ? (
        <Image
          source={sprite}
          resizeMode="contain"
          style={{ width: size, height: size }}
          // Pixel-art crispness: avoid bilinear smoothing where the runtime supports it.
          fadeDuration={0}
        />
      ) : (
        <>
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: color,
              opacity: 0.35,
            }}
          />
          {emoji ? (
            <Text style={{ fontSize: size * 0.58, lineHeight: size * 0.7 }}>{emoji}</Text>
          ) : null}
        </>
      )}
    </View>
  );
}

export function SeasonSegmented({ season, setSeason, t }) {
  const theme = useTheme();
  const seasons = ["spring", "summer", "fall", "winter"];
  const glyph = { spring: "🌸", summer: "☀️", fall: "🍂", winter: "❄️" };
  return (
    <View
      style={[
        {
          flexDirection: "row",
          backgroundColor: theme.surface,
          borderWidth: 2,
          borderColor: theme.ink,
          borderRadius: 3,
          padding: 2,
          gap: 2,
        },
        pixelShadow(theme.line, 2),
      ]}
    >
      {seasons.map((s) => {
        const active = season === s;
        return (
          <Pressable
            key={s}
            onPress={() => setSeason(s)}
            style={{
              flex: 1,
              paddingVertical: 6,
              paddingHorizontal: 2,
              minWidth: 0,
              backgroundColor: active ? theme.ink : "transparent",
              borderRadius: 2,
              alignItems: "center",
              gap: 1,
            }}
          >
            <Text style={{ fontSize: 12, lineHeight: 14, color: active ? theme.surface : theme.ink2 }}>
              {glyph[s]}
            </Text>
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 9,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                fontWeight: "700",
                color: active ? theme.surface : theme.ink2,
              }}
            >
              {t(`seasonShort.${s}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function LangToggle({ lang, setLang }) {
  const t = useTheme();
  return (
    <Pressable
      onPress={() => setLang(lang === "es" ? "en" : "es")}
      style={{
        borderWidth: 1.5,
        borderColor: t.ink3,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 2,
      }}
    >
      <Text
        style={{
          fontFamily: PIXEL,
          fontSize: 10,
          letterSpacing: 0.8,
          color: t.ink2,
          fontWeight: "700",
        }}
      >
        {lang.toUpperCase()}
      </Text>
    </Pressable>
  );
}

export function Segmented({ value, onChange, options, compact = false }) {
  const t = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: t.surface2,
        borderWidth: 1.5,
        borderColor: t.ink3,
        borderRadius: 3,
        padding: 2,
        gap: 2,
      }}
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <Pressable
            key={o.id}
            onPress={() => onChange(o.id)}
            style={{
              flex: 1,
              paddingVertical: compact ? 4 : 7,
              paddingHorizontal: 6,
              backgroundColor: active ? t.ink : "transparent",
              borderRadius: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {o.glyph ? (
              <Text style={{ fontSize: 11, color: active ? t.surface : t.ink2 }}>{o.glyph}</Text>
            ) : null}
            <Text
              style={{
                fontFamily: PIXEL,
                fontSize: 9,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                fontWeight: "700",
                color: active ? t.surface : t.ink2,
              }}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function SearchBar({ value, onChange, placeholder, autoFocus }) {
  const t = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: t.surface,
          borderWidth: 2,
          borderColor: t.ink,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 3,
          marginHorizontal: 12,
          marginBottom: 10,
        },
        pixelShadow(t.line, 2),
      ]}
    >
      <Text style={{ fontSize: 14 }}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={t.ink3}
        autoFocus={autoFocus}
        style={{
          flex: 1,
          fontSize: 13,
          color: t.ink,
          padding: 0,
        }}
      />
      {value ? (
        <Pressable onPress={() => onChange("")}>
          <Text style={{ color: t.ink3, fontSize: 14 }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyState({ glyph = "🌾", title, hint }) {
  const t = useTheme();
  return (
    <View style={{ paddingVertical: 32, paddingHorizontal: 20, alignItems: "center" }}>
      <Text style={{ fontSize: 42, marginBottom: 10 }}>{glyph}</Text>
      <Text style={{ fontSize: 14, fontWeight: "700", color: t.ink, textAlign: "center" }}>
        {title}
      </Text>
      {hint ? (
        <Text
          style={{
            fontFamily: PIXEL,
            fontSize: 11,
            color: t.ink2,
            marginTop: 6,
            textAlign: "center",
            lineHeight: 16,
          }}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

function Toast({ toast, onDismiss, platform, appName = "Diario del Granjero" }) {
  const t = useTheme();
  const slide = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 400, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [slide, opacity]);
  return (
    <Animated.View
      style={{
        transform: [{ translateY: slide }],
        opacity,
      }}
    >
      <Pressable
        onPress={() => onDismiss(toast.id)}
        style={{
          backgroundColor: "rgba(30,22,10,0.96)",
          borderWidth: 2,
          borderColor: t.gold,
          borderRadius: platform === "ios" ? 14 : 4,
          paddingVertical: 10,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: t.gold,
            borderWidth: 2,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
          }}
        >
          <Text style={{ fontSize: 16 }}>{toast.icon || "🪵"}</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontFamily: PIXEL,
              fontSize: 9,
              letterSpacing: 0.8,
              color: t.gold,
              textTransform: "uppercase",
            }}
          >
            🍓 {appName.toUpperCase()} · {toast.time || "now"}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "700", color: "#fff", marginTop: 2 }}>
            {toast.title}
          </Text>
          <Text style={{ fontFamily: PIXEL, fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>
            {toast.body}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function ToastStack({ toasts, onDismiss, platform = "ios", appName }) {
  if (!toasts.length) return null;
  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        zIndex: 100,
        gap: 6,
      }}
    >
      {toasts.map((tt) => (
        <Toast key={tt.id} toast={tt} onDismiss={onDismiss} platform={platform} appName={appName} />
      ))}
    </View>
  );
}

export function ProgressBar({ pct, color }) {
  const t = useTheme();
  return (
    <View
      style={{
        height: 14,
        backgroundColor: t.surface2,
        borderWidth: 2,
        borderColor: t.ink,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: `${Math.min(100, Math.max(0, pct))}%`,
          height: "100%",
          backgroundColor: color || t.accent,
        }}
      />
    </View>
  );
}
