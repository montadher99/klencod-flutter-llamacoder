import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown } from "lucide-react";
import type { SquadSlot } from "@/App";
import { cn } from "@/lib/utils";

type LeaderboardProps = {
  squad: SquadSlot[];
  captainId: number | null;
  viceId: number | null;
};

const rivals = [
  { name: "أبو رعد", team: "فريق الزقاق", base: 612 },
  { name: "كرار الأسطورة", team: "شباب الحوش", base: 598 },
  { name: "عم كريم", team: "الصبخاية الأصلي", base: 574 },
  { name: "حيدر", team: "نجوم المحلة", base: 551 },
  { name: "أبو تراب", team: "أسود الصبخاية", base: 533 },
  { name: "مصطفى", team: "فريق الجيران", base: 512 },
];

export function Leaderboard({ squad, captainId, viceId }: LeaderboardProps) {
  const myPoints = Math.round(
    squad.reduce((sum, s) => {
      const mult = s.player.id === captainId ? 2 : s.player.id === viceId ? 1.5 : 1;
      return sum + s.player.points * mult;
    }, 0)
  );

  const rows = [
    ...rivals.map((r) => ({ name: r.name, team: r.team, points: r.base, me: false })),
    { name: "فريقي", team: "تشكيلتك الحالية", points: myPoints, me: true },
  ].sort((a, b) => b.points - a.points);

  const myRank = rows.findIndex((r) => r.me) + 1;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  ترتيب دوري الصبخاية
                </h2>
                <p className="text-sm text-muted-foreground">الجولة 12 · تحديث مباشر</p>
              </div>
            </div>

            <div className="space-y-2">
              {rows.map((r, i) => (
                <div
                  key={r.name}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 transition-all",
                    r.me
                      ? "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-200"
                      : "border-slate-200 bg-white hover:shadow-sm"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                      i === 0
                        ? "bg-amber-400 text-amber-950"
                        : i === 1
                        ? "bg-slate-300 text-slate-800"
                        : i === 2
                        ? "bg-orange-300 text-orange-900"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold text-slate-900">{r.name}</p>
                      {r.me && (
                        <Badge className="bg-emerald-600 text-white">أنت</Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{r.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold tabular-nums text-slate-900">{r.points}</p>
                    <p className="text-xs text-muted-foreground">نقطة</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-emerald-900/10 bg-gradient-to-br from-amber-50 to-emerald-50 shadow-sm">
          <CardContent className="p-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-amber-950 shadow-md">
              <Medal className="h-7 w-7" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">ترتيبك الحالي</p>
            <p className="font-serif text-4xl font-bold text-emerald-900">
              #{myRank}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              من {rows.length} فرق
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-900/10 shadow-sm">
          <CardContent className="p-5">
            <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-slate-900">
              <Crown className="h-5 w-5 text-amber-500" />
              نجوم الجولة
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              {squad.length === 0 ? (
                <p className="text-muted-foreground">
                  اختر لاعبين لعرض نجوم فريقك
                </p>
              ) : (
                [...squad]
                  .sort((a, b) => b.player.points - a.player.points)
                  .slice(0, 3)
                  .map((s) => (
                    <div
                      key={s.player.id}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                    >
                      <span className="truncate font-medium text-slate-800">
                        {s.player.name}
                      </span>
                      <span className="font-bold text-emerald-700">
                        {s.player.points}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}