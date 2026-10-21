export type Position = "GK" | "DEF" | "MID" | "FWD";

export type Player = {
  id: number;
  name: string;
  team: string;
  position: Position;
  price: number;
  form: number;
  points: number;
  ownership: number;
};

export const positionLabels: Record<Position, string> = {
  GK: "حراسة",
  DEF: "دفاع",
  MID: "وسط",
  FWD: "هجوم",
};

export const positionColors: Record<Position, string> = {
  GK: "bg-amber-100 text-amber-800 border-amber-200",
  DEF: "bg-sky-100 text-sky-800 border-sky-200",
  MID: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FWD: "bg-rose-100 text-rose-800 border-rose-200",
};

export const players: Player[] = [
  { id: 1, name: "أبو صبحي", team: "الصبخاية", position: "GK", price: 5.5, form: 6.2, points: 78, ownership: 34.1 },
  { id: 2, name: "حارس الحارة", team: "الزقاق", position: "GK", price: 4.5, form: 4.1, points: 52, ownership: 12.4 },
  { id: 3, name: "عم كريم", team: "الصبخاية", position: "GK", price: 4.0, form: 3.3, points: 41, ownership: 6.8 },
  { id: 4, name: "أبو رعد", team: "الصبخاية", position: "DEF", price: 6.5, form: 7.1, points: 96, ownership: 41.2 },
  { id: 5, name: "سالم الطويل", team: "الزقاق", position: "DEF", price: 5.5, form: 5.4, points: 74, ownership: 22.9 },
  { id: 6, name: "مروان", team: "الصبخاية", position: "DEF", price: 5.0, form: 4.8, points: 68, ownership: 18.3 },
  { id: 7, name: "أبو حمزة", team: "الحوش", position: "DEF", price: 4.5, form: 3.9, points: 55, ownership: 9.7 },
  { id: 8, name: "علي الصغير", team: "الزقاق", position: "DEF", price: 4.0, form: 3.2, points: 44, ownership: 5.1 },
  { id: 9, name: "حسن الجدع", team: "الصبخاية", position: "DEF", price: 4.5, form: 4.4, points: 61, ownership: 11.2 },
  { id: 10, name: "أبو يوسف", team: "الحوش", position: "DEF", price: 4.0, form: 2.8, points: 38, ownership: 3.9 },
  { id: 11, name: "كرار", team: "الصبخاية", position: "MID", price: 8.5, form: 8.9, points: 124, ownership: 58.4 },
  { id: 12, name: "أبو تراب", team: "الزقاق", position: "MID", price: 7.5, form: 7.6, points: 108, ownership: 44.7 },
  { id: 13, name: "مصطفى", team: "الصبخاية", position: "MID", price: 6.5, form: 6.1, points: 89, ownership: 27.5 },
  { id: 14, name: "أبو زهراء", team: "الحوش", position: "MID", price: 6.0, form: 5.5, points: 81, ownership: 19.8 },
  { id: 15, name: "حيدر", team: "الزقاق", position: "MID", price: 5.5, form: 4.9, points: 72, ownership: 14.1 },
  { id: 16, name: "أبو محمد", team: "الصبخاية", position: "MID", price: 5.0, form: 4.2, points: 63, ownership: 8.6 },
  { id: 17, name: "جعفر", team: "الحوش", position: "MID", price: 4.5, form: 3.6, points: 51, ownership: 4.4 },
  { id: 18, name: "أبو سجاد", team: "الصبخاية", position: "FWD", price: 9.5, form: 9.4, points: 138, ownership: 62.3 },
  { id: 19, name: "أحمد الهداف", team: "الزقاق", position: "FWD", price: 8.0, form: 7.8, points: 115, ownership: 48.9 },
  { id: 20, name: "أبو فاطمة", team: "الحوش", position: "FWD", price: 7.0, form: 6.4, points: 94, ownership: 31.2 },
  { id: 21, name: "عمار", team: "الصبخاية", position: "FWD", price: 6.0, form: 5.2, points: 77, ownership: 16.5 },
  { id: 22, name: "أبو حسين", team: "الزقاق", position: "FWD", price: 5.5, form: 4.6, points: 66, ownership: 7.3 },
];