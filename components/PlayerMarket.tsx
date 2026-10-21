import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Check, TrendingUp } from "lucide-react";
import {
  players as allPlayers,
  positionLabels,
  positionColors,
  type Player,
  type Position,
} from "@/data/players";
import type { SquadSlot } from "@/App";
import { cn } from "@/lib/utils";

type PlayerMarketProps = {
  players: Player[];
  squad: SquadSlot[];
  remaining: number;
  onAdd: (p: Player) => void;
};

export function PlayerMarket({ squad, remaining, onAdd }: PlayerMarketProps) {
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState<Position | "ALL">("ALL");
  const [sort, setSort] = useState<"points" | "price" | "form">("points");

  const squadIds = useMemo(() => new Set(squad.map((s) => s.player.id)), [squad]);

  const filtered = useMemo(() => {
    const list = allPlayers.filter((p) => {
      const matchQ =
        p.name.includes(query) || p.team.includes(query) || query.trim() === "";
      const matchPos = pos === "ALL" || p.position === pos;
      return matchQ && matchPos;
    });
    return list.sort((a, b) => b[sort] - a[sort]);
  }, [query, pos, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن لاعب أو فريق..."
                  className="pr-9"
                />
              </div>
              <Select value={pos} onValueChange={(v) => setPos(v as Position | "ALL")}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="المركز" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">كل المراكز</SelectItem>
                  <SelectItem value="GK">حراسة</SelectItem>
                  <SelectItem value="DEF">دفاع</SelectItem>
                  <SelectItem value="MID">وسط</SelectItem>
                  <SelectItem value="FWD">هجوم</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="ترتيب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="points">النقاط</SelectItem>
                  <SelectItem value="price">السعر</SelectItem>
                  <SelectItem value="form">الفورمة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-emerald-900/15 bg-emerald-50/50 py-16 text-center">
                  <p className="text-sm font-medium text-emerald-900">لا يوجد لاعبون مطابقون</p>
                  <p className="mt-1 text-xs text-muted-foreground">جرّب تغيير البحث أو الفلتر</p>
                </div>
              )}

              {filtered.map((p) => {
                const inSquad = squadIds.has(p.id);
                const tooExpensive = !inSquad && p.price > remaining;
                const disabled = inSquad || tooExpensive || squad.length >= 15;
                return (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3 transition-all",
                      inSquad
                        ? "border-emerald-300 bg-emerald-50/70"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-xs font-bold",
                        positionColors[p.position]
                      )}
                    >
                      {positionLabels[p.position]}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-semibold text-slate-900">{p.name}</p>
                        {p.form >= 7 && (
                          <TrendingUp className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.team} · ملكية {p.ownership}%
                      </p>
                    </div>

                    <div className="hidden text-center sm:block">
                      <p className="text-xs text-muted-foreground">النقاط</p>
                      <p className="font-bold tabular-nums text-slate-900">{p.points}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">السعر</p>
                      <p className="font-bold tabular-nums text-emerald-700">
                        {p.price.toFixed(1)}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant={inSquad ? "secondary" : "default"}
                      disabled={disabled}
                      onClick={() => onAdd(p)}
                      className={cn(
                        "shrink-0 gap-1",
                        !inSquad && "bg-emerald-600 hover:bg-emerald-700"
                      )}
                    >
                      {inSquad ? (
                        <>
                          <Check className="h-4 w-4" /> مضاف
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> أضف
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-emerald-900/10 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-serif text-lg font-bold text-emerald-900">قواعد التشكيلة</h3>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
              <li className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span>حراسة</span>
                <span className="font-semibold">2</span>
              </li>
              <li className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span>دفاع</span>
                <span className="font-semibold">5</span>
              </li>
              <li className="flex justify-between border-b border-emerald-900/10 pb-2">
                <span>وسط</span>
                <span className="font-semibold">5</span>
              </li>
              <li className="flex justify-between">
                <span>هجوم</span>
                <span className="font-semibold">3</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-serif text-lg font-bold text-slate-900">أفضل الفورمة</h3>
            <div className="mt-3 space-y-3">
              {[...allPlayers]
                .sort((a, b) => b.form - a.form)
                .slice(0, 4)
                .map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.team}</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      {p.form.toFixed(1)}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}