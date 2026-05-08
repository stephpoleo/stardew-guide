import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { CompactHeader } from "./components/CompactHeader";
import { TabBar } from "./components/TabBar";
import { Segmented, ToastStack } from "./components/primitives";
import { FISH } from "./data";
import { I18N, useT } from "./i18n";
import { ThemeProvider, useTheme } from "./theme";
import { AnimalsScreen } from "./screens/AnimalsScreen";
import { CaskCalendarScreen } from "./screens/CaskCalendarScreen";
import { CaskScreen } from "./screens/CaskScreen";
import { CompareScreen } from "./screens/CompareScreen";
import { FishDetailScreen } from "./screens/FishDetailScreen";
import { FishScreen } from "./screens/FishScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ProcessScreen } from "./screens/ProcessScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { SeedsScreen } from "./screens/SeedsScreen";
import { usePersistedState } from "./usePersistedState";

const TICK_MS = 500;
const READY_HOLD_MS = 6000;
const CASKS_STORAGE_KEY = "ha:casks:v1";

const initialCasks = (now) => [
  {
    uid: "seed1",
    itemId: "grape",
    label: { es: "Vino tinto", en: "Grape Wine" },
    basePrice: 80,
    mult: 3,
    startTime: now - 22000,
    durationMs: 60000,
    progress: 22 / 60,
  },
  {
    uid: "seed2",
    itemId: "cheese",
    label: { es: "Queso dorado", en: "Iridium Cheese" },
    basePrice: 230,
    mult: 2,
    startTime: now - 65000,
    durationMs: 60000,
    progress: 1,
  },
  {
    uid: "seed3",
    itemId: "starfruit",
    label: { es: "Vino estrella", en: "Starfruit Wine" },
    basePrice: 750,
    mult: 3,
    startTime: now - 8000,
    durationMs: 60000,
    progress: 8 / 60,
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
  const [caskView, setCaskView] = useState("list");
  const [selectedFish, setSelectedFish] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [casks, setCasks, casksHydrated] = usePersistedState(
    CASKS_STORAGE_KEY,
    () => initialCasks(Date.now()),
  );
  const [toasts, setToasts] = useState([]);
  const notifiedRef = useRef(new Set(["seed2"]));
  const hydrationAppliedRef = useRef(false);
  const t = useT(lang);

  useEffect(() => {
    if (!casksHydrated || hydrationAppliedRef.current) return;
    hydrationAppliedRef.current = true;
    casks.forEach((c) => {
      if (c.progress >= 1) notifiedRef.current.add(c.uid);
    });
  }, [casksHydrated, casks]);

  useEffect(() => {
    const id = setInterval(() => {
      setCasks((prev) =>
        prev.map((c) => {
          if (c.progress >= 1) return c;
          const elapsed = Date.now() - c.startTime;
          const p = Math.min(1, elapsed / c.durationMs);
          return { ...c, progress: p };
        }),
      );
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    casks.forEach((c) => {
      if (c.progress >= 1 && !notifiedRef.current.has(c.uid)) {
        notifiedRef.current.add(c.uid);
        const id = "t" + Date.now() + Math.random().toString(36).slice(2, 5);
        const finalPrice = Math.round(c.basePrice * (c.mult || 1) * 2);
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
  }, [casks, lang]);

  const addCask = (cask) => {
    setCasks((prev) => [cask, ...prev]);
    setPage("workshop");
    setWorkshopTab("cask");
    setCaskView("list");
  };
  const collectCask = (uid) => {
    notifiedRef.current.delete(uid);
    setCasks((prev) => prev.filter((c) => c.uid !== uid));
  };
  const dismissToast = (id) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const state = { lang, season, casks };
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

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <ToastStack toasts={toasts} onDismiss={dismissToast} platform={Platform.OS} />

      <CompactHeader
        lang={lang}
        setLang={setLang}
        season={season}
        setSeason={setSeason}
        t={t}
        onSearchClick={() => setPage("search")}
        searchActive={page === "search"}
        showSeason={!hideSeason}
        title={screenTitle}
        onBack={onBack}
      />

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
