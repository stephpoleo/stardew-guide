import { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Text, View } from "react-native";
import {
  CASK_DURATION_DAYS,
  fromAbsDay,
  progressFor,
  toAbsDay,
} from "./calendar";
import { CompactHeader } from "./components/CompactHeader";
import { TabBar } from "./components/TabBar";
import { Segmented, ToastStack } from "./components/primitives";
import { FISH } from "./data";
import { I18N, useT } from "./i18n";
import { ThemeProvider, useTheme } from "./theme";
import { AnimalsScreen } from "./screens/AnimalsScreen";
import { ArtifactsScreen } from "./screens/ArtifactsScreen";
import { CaskCalendarScreen } from "./screens/CaskCalendarScreen";
import { CaskScreen } from "./screens/CaskScreen";
import { CompareScreen } from "./screens/CompareScreen";
import { FishDetailScreen } from "./screens/FishDetailScreen";
import { FishScreen } from "./screens/FishScreen";
import { GiftsScreen } from "./screens/GiftsScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MineralsScreen } from "./screens/MineralsScreen";
import { ProcessScreen } from "./screens/ProcessScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { SeedsScreen } from "./screens/SeedsScreen";
import { usePersistedState } from "./usePersistedState";

const READY_HOLD_MS = 6000;
const CASKS_STORAGE_KEY = "ha:casks:v2";
const CURRENT_DAY_STORAGE_KEY = "ha:dayOfSeason:v1";
const DEFAULT_DAY = 14;

const initialCasks = (currentAbsDay) => [
  // Three seed casks with staggered start days so the user sees the bar at
  // different positions on first open. Picked relative to the default day so
  // a fresh install on default settings shows: aging silver, ready, just-started.
  {
    uid: "seed1",
    itemId: "grape",
    label: { es: "Vino tinto iridio", en: "Iridium Grape Wine" },
    basePrice: 240,
    mult: 2,
    startAbsDay: currentAbsDay - 20,
    durationDays: CASK_DURATION_DAYS,
  },
  {
    uid: "seed2",
    itemId: "cheese",
    label: { es: "Queso iridio", en: "Iridium Cheese" },
    basePrice: 230,
    mult: 2,
    startAbsDay: currentAbsDay - CASK_DURATION_DAYS,
    durationDays: CASK_DURATION_DAYS,
  },
  {
    uid: "seed3",
    itemId: "starfruit",
    label: { es: "Vino estrella iridio", en: "Iridium Starfruit Wine" },
    basePrice: 2250,
    mult: 2,
    startAbsDay: currentAbsDay - 4,
    durationDays: CASK_DURATION_DAYS,
  },
];

export function Almanac() {
  const [season, setSeason] = useState("spring");
  return (
    <ThemeProvider season={season}>
      <PrototypeShell season={season} setSeason={setSeason} />
    </ThemeProvider>
  );
}

function PrototypeShell({ season, setSeason }) {
  const theme = useTheme();
  const [lang, setLang] = useState("es");
  const [page, setPage] = useState("home");
  const [workshopTab, setWorkshopTab] = useState("process");
  const [codexTab, setCodexTab] = useState("minerals");
  const [caskView, setCaskView] = useState("list");
  const [selectedFish, setSelectedFish] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDay, setCurrentDay] = usePersistedState(CURRENT_DAY_STORAGE_KEY, DEFAULT_DAY);
  const currentAbsDay = useMemo(() => toAbsDay(season, currentDay), [season, currentDay]);
  const [casks, setCasks, casksHydrated] = usePersistedState(
    CASKS_STORAGE_KEY,
    () => initialCasks(toAbsDay("spring", DEFAULT_DAY)),
  );
  const [toasts, setToasts] = useState([]);
  const notifiedRef = useRef(new Set());
  const hydrationAppliedRef = useRef(false);
  const t = useT(lang);

  useEffect(() => {
    if (!casksHydrated || hydrationAppliedRef.current) return;
    hydrationAppliedRef.current = true;
    casks.forEach((c) => {
      if (progressFor(c, currentAbsDay) >= 1) notifiedRef.current.add(c.uid);
    });
  }, [casksHydrated, casks, currentAbsDay]);

  useEffect(() => {
    casks.forEach((c) => {
      const p = progressFor(c, currentAbsDay);
      if (p >= 1 && !notifiedRef.current.has(c.uid)) {
        notifiedRef.current.add(c.uid);
        const id = "t" + Date.now() + Math.random().toString(36).slice(2, 5);
        const finalPrice = Math.round(c.basePrice * (c.mult || 1));
        const { title, body } = I18N[lang].misc.readyToast(c.label[lang], finalPrice);
        setToasts((prev) => [
          ...prev,
          { id, icon: "🪵", time: I18N[lang].misc.now, title, body },
        ]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== id));
        }, READY_HOLD_MS);
      }
    });
  }, [casks, currentAbsDay, lang]);

  const addCask = (item) => {
    const newCask = {
      uid: "c" + Date.now() + Math.random().toString(36).slice(2, 6),
      itemId: item.itemId,
      label: item.label,
      basePrice: item.basePrice,
      mult: item.mult || 2,
      startAbsDay: currentAbsDay,
      durationDays: CASK_DURATION_DAYS,
    };
    setCasks((prev) => [newCask, ...prev]);
    setPage("workshop");
    setWorkshopTab("cask");
    setCaskView("list");
  };
  const collectCask = (uid) => {
    notifiedRef.current.delete(uid);
    setCasks((prev) => prev.filter((c) => c.uid !== uid));
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const state = { lang, season, currentDay, currentAbsDay, casks };
  const goToWorkshop = (tab) => {
    setPage("workshop");
    if (tab) setWorkshopTab(tab);
  };
  const handleSetPage = (p) => {
    if (p === "fish") setSelectedFish(null);
    setPage(p);
  };

  let body = null;
  let screenTitle = null;
  let onBack = null;
  let hideSeason = false;

  if (page === "home") {
    body = <HomeScreen state={state} setPage={setPage} goToWorkshop={goToWorkshop} />;
  } else if (page === "seeds") {
    body = <SeedsScreen state={state} />;
  } else if (page === "fish") {
    body = (
      <FishScreen
        state={state}
        setSelectedFish={(id) => {
          setSelectedFish(id);
          setPage("fishDetail");
        }}
      />
    );
  } else if (page === "fishDetail") {
    body = <FishDetailScreen state={state} fishId={selectedFish} />;
    hideSeason = true;
    const fish = FISH.find((f) => f.id === selectedFish);
    screenTitle = fish ? fish.name[lang] : "";
    onBack = () => setPage("fish");
  } else if (page === "animals") {
    body = <AnimalsScreen state={state} />;
  } else if (page === "codex") {
    if (codexTab === "minerals") body = <MineralsScreen state={state} />;
    else if (codexTab === "gifts") body = <GiftsScreen state={state} />;
    else if (codexTab === "artifacts") body = <ArtifactsScreen state={state} />;
    hideSeason = true;
  } else if (page === "workshop") {
    if (workshopTab === "process") {
      body = <ProcessScreen state={state} addCask={addCask} />;
    } else if (workshopTab === "cask") {
      body =
        caskView === "calendar" ? (
          <CaskCalendarScreen state={state} />
        ) : (
          <CaskScreen state={state} collectCask={collectCask} />
        );
    } else if (workshopTab === "compare") {
      body = <CompareScreen state={state} />;
    }
  } else if (page === "search") {
    body = (
      <SearchScreen
        state={state}
        query={searchQuery}
        setQuery={setSearchQuery}
        setPage={setPage}
        setSelectedFish={setSelectedFish}
        goToWorkshop={goToWorkshop}
      />
    );
    hideSeason = true;
    screenTitle = I18N[lang].misc.searchTitle;
    onBack = () => setPage("home");
  } else {
    body = <HomeScreen state={state} setPage={setPage} goToWorkshop={goToWorkshop} />;
  }

  const tabPage = page === "fishDetail" ? "fish" : page;
  const yearRoundActive = page === "codex";

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <ToastStack toasts={toasts} onDismiss={dismissToast} platform={Platform.OS} appName={t("appName")} />

      <CompactHeader
        lang={lang}
        setLang={setLang}
        season={season}
        setSeason={setSeason}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        t={t}
        onSearchClick={() => setPage("search")}
        searchActive={page === "search"}
        showSeason={!hideSeason}
        title={screenTitle}
        onBack={onBack}
      />

      {yearRoundActive ? (
        <YearRoundBanner lang={lang} />
      ) : null}

      {page === "codex" ? (
        <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 6 }}>
          <Segmented
            value={codexTab}
            onChange={setCodexTab}
            options={[
              { id: "minerals",  glyph: "💎", label: t("codexTabs.minerals") },
              { id: "gifts",     glyph: "🎁", label: t("codexTabs.gifts") },
              { id: "artifacts", glyph: "🏺", label: t("codexTabs.artifacts") },
            ]}
          />
        </View>
      ) : null}

      {page === "workshop" ? (
        <View style={{ paddingHorizontal: 12, paddingTop: 10, paddingBottom: 6, gap: 8 }}>
          <Segmented
            value={workshopTab}
            onChange={setWorkshopTab}
            options={[
              { id: "process", glyph: "🛢️", label: t("workshopTabs.process") },
              { id: "cask", glyph: "🪵", label: t("workshopTabs.cask") },
              { id: "compare", glyph: "⚖️", label: t("workshopTabs.compare") },
            ]}
          />
          {workshopTab === "cask" ? (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View style={{ width: 180 }}>
                <Segmented
                  compact
                  value={caskView}
                  onChange={setCaskView}
                  options={[
                    { id: "list", glyph: "📋", label: t("cask.viewList") },
                    { id: "calendar", glyph: "📅", label: t("cask.viewCal") },
                  ]}
                />
              </View>
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={{ flex: 1 }}>{body}</View>

      <TabBar
        page={tabPage}
        setPage={(p) => {
          if (p === "workshop") {
            setPage("workshop");
          } else {
            handleSetPage(p);
          }
        }}
        t={t}
      />
    </View>
  );
}

function YearRoundBanner({ lang }) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: theme.surface2,
        borderBottomWidth: 1,
        borderBottomColor: theme.line,
        paddingHorizontal: 14,
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: theme.gold,
          borderWidth: 1.5,
          borderColor: theme.ink,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>🌐</Text>
      </View>
      <Text
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: 1.0,
          color: theme.ink,
          textTransform: "uppercase",
          fontWeight: "700",
        }}
      >
        {I18N[lang].misc.yearRound}
      </Text>
      <Text
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          color: theme.ink2,
          letterSpacing: 0.4,
        }}
      >
        · {I18N[lang].misc.yearRoundHint}
      </Text>
    </View>
  );
}
