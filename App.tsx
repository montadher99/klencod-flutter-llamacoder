import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { PlayerMarket } from "@/components/PlayerMarket";
import { MySquad } from "@/components/MySquad";
import { Leaderboard } from "@/components/Leaderboard";
import { players as allPlayers, type Player } from "@/data/players";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingCart, Trophy } from "lucide-react";

export type SquadSlot = {
  player: Player;
  isCaptain: boolean;
  isVice: boolean;
};

const BUDGET = 100;

export default function App() {
  const [squad, setSquad] = useState<SquadSlot[]>([]);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceId, setViceId] = useState<number | null>(null);

  const spent = useMemo(
    () => squad.reduce((sum, s) => sum + s.player.price, 0),
    [squad]
  );
  const remaining = Math.round((BUDGET - spent) * 10) / 10;

  const addPlayer = (player: Player) => {
    if (squad.length >= 15) return;
    if (squad.some((s) => s.player.id === player.id)) return;
    if (player.price > remaining) return;
    const posCount = squad.filter((s) => s.player.position === player.position).length;
    if (player.position === "GK" && posCount >= 2) return;
    if (player.position === "DEF" && posCount >= 5) return;
    if (player.position === "MID" && posCount >= 5) return;
    if (player.position === "FWD" && posCount >= 3) return;
    setSquad((prev) => [...prev, { player, isCaptain: false, isVice: false }]);
  };

  const removePlayer = (id: number) => {
    setSquad((prev) => prev.filter((s) => s.player.id !== id));
    if (captainId === id) setCaptainId(null);
    if (viceId === id) setViceId(null);
  };

  const setCaptain = (id: number) => {
    setCaptainId(id);
    if (viceId === id) setViceId(null);
  };
  const setVice = (id: number) => {
    setViceId(id);
    if (captainId === id) setCaptainId(null);
  };

  const resetSquad = () => {
    setSquad([]);
    setCaptainId(null);
    setViceId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100">
      <Header
        squadCount={squad.length}
        remaining={remaining}
        budget={BUDGET}
        onReset={resetSquad}
      />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-xl grid-cols-3 rounded-xl bg-emerald-900/5 p-1">
            <TabsTrigger value="market" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <ShoppingCart className="h-4 w-4" />
              سوق اللاعبين
            </TabsTrigger>
            <TabsTrigger value="squad" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              تشكيلتي
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Trophy className="h-4 w-4" />
              الترتيب
            </TabsTrigger>
          </TabsList>

          <TabsContent value="market">
            <PlayerMarket
              players={allPlayers}
              squad={squad}
              remaining={remaining}
              onAdd={addPlayer}
            />
          </TabsContent>

          <TabsContent value="squad">
            <MySquad
              squad={squad}
              captainId={captainId}
              viceId={viceId}
              remaining={remaining}
              onRemove={removePlayer}
              onSetCaptain={setCaptain}
              onSetVice={setVice}
            />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard squad={squad} captainId={captainId} viceId={viceId} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}