import type { Design, Point, Geometry, HydraulicResult, Measurement, Calibration, Project } from '@/types/hydraulics';
export function trapezoid(d: Design, depth = d.depth): Geometry {
 const area = (d.width + d.side * depth) * depth, perimeter = d.width + 2 * depth * Math.sqrt(1 + d.side ** 2);
 return { area, perimeter, radius: perimeter ? area / perimeter : 0, topWidth: d.width + 2 * d.side * depth, closed: depth <= d.bank };
}
export function surveyed(points: Point[], level: number): Geometry {
 let area = 0, perimeter = 0, topWidth = 0;
 for (let i = 1; i < points.length; i++) {
  const p = points[i - 1], q = points[i], dx = q.x - p.x, h1 = level - p.z, h2 = level - q.z;
  if (h1 <= 0 && h2 <= 0) continue;
  if (h1 >= 0 && h2 >= 0) { area += dx * (h1 + h2) / 2; perimeter += Math.hypot(dx, q.z - p.z); topWidth += dx; }
  else { const fraction = Math.max(h1, h2) / Math.abs(h2 - h1); area += dx * fraction * Math.max(h1, h2) / 2; perimeter += Math.hypot(dx, q.z - p.z) * fraction; topWidth += dx * fraction; }
 }
 return { area, perimeter, radius: perimeter ? area / perimeter : 0, topWidth, closed: points.length >= 2 && level <= points[0].z && level <= points[points.length - 1].z };
}
export function hydraulics(g: Geometry, n: number, slope: number): HydraulicResult {
 const q = g.area > 0 && n > 0 && slope > 0 ? g.area * g.radius ** (2 / 3) * Math.sqrt(slope) / n : 0;
 const velocity = g.area ? q / g.area : 0;
 return { ...g, q, velocity, froude: g.area && g.topWidth ? velocity / Math.sqrt(9.81 * g.area / g.topWidth) : 0 };
}
export function bedLevel(p: Project) { return p.source === 'survey' ? Math.min(...p.points.map(v => v.z)) : p.design.bed; }
export function capacityDepth(p: Project) { return p.source === 'survey' ? Math.min(p.points[0].z, p.points[p.points.length - 1].z) - bedLevel(p) : p.design.bank; }
export function calculate(p: Project, depth = p.design.depth) { const g = p.source === 'survey' ? surveyed(p.points, bedLevel(p) + depth) : trapezoid(p.design, depth); return hydraulics(g, p.design.n, p.design.slope); }
export function calibrate(rows: Measurement[], bed: number): Calibration | null {
 const valid = rows.filter(v => v.level > bed && v.q > 0); if (valid.length < 3) return null;
 const xs = valid.map(v => Math.log(v.level - bed)), ys = valid.map(v => Math.log(v.q)), count = xs.length;
 const mx = xs.reduce((a,b) => a+b,0)/count, my = ys.reduce((a,b) => a+b,0)/count;
 const denominator = xs.reduce((a,x) => a + (x - mx) ** 2,0); if (denominator < 1e-12) return null;
 const b = xs.reduce((a,x,i) => a + (x - mx) * (ys[i] - my),0) / denominator, logA = my - b * mx;
 const total = ys.reduce((a,y) => a+(y-my)**2,0), residual = ys.reduce((a,y,i) => a+(y-logA-b*xs[i])**2,0);
 if (b <= 0 || total < 1e-12) return null;
 return { a: Math.exp(logA), b, r2: 1 - residual/total, min: Math.min(...valid.map(v=>v.level)), max: Math.max(...valid.map(v=>v.level)) };
}
export function downloadCsv(name: string, rows: (string | number)[][]) {
 const csv = '\ufeff' + rows.map(row => row.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');
 const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}
export function parseCsv(text: string, columns: number): number[][] {
 const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(Boolean);
 const rows = lines.map(line => line.split(/[,;\t]/).map(v => v.trim().replace(/^"|"$/g, '')));
 if (rows.length && rows[0].some(v => !Number.isFinite(Number(v)))) rows.shift();
 if (!rows.length || rows.some(r => r.length !== columns || r.some(v => v === '' || !Number.isFinite(Number(v))))) throw new Error(`يلزم ${columns} أعمدة رقمية لكل صف، دون خلايا فارغة.`);
 return rows.map(r => r.map(Number));
}
