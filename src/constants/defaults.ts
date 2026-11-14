import type { Project } from '@/types/hydraulics';
export const DEFAULT_PROJECT: Project = {
 name: 'ترعة الإبراهيمية', location: 'محافظة أسيوط · قطاع توضيحي',
 design: { width: 12, side: 1.5, bank: 4, depth: 2.4, bed: 42.5, n: .025, slope: .00012, flood: 46 },
 source: 'design', reference: 'absolute',
 points: [{ x: 0, z: 46.5 }, { x: 4, z: 44.3 }, { x: 6, z: 42.5 }, { x: 12, z: 42.7 }, { x: 18, z: 42.5 }, { x: 21, z: 44.2 }, { x: 24, z: 46.5 }],
 stations: [{ x: 0, bed: 42.5, water: 44.9, bank: 46.5 }, { x: 250, bed: 42.47, water: 44.87, bank: 46.47 }, { x: 500, bed: 42.44, water: 44.84, bank: 46.44 }, { x: 750, bed: 42.41, water: 44.81, bank: 46.41 }, { x: 1000, bed: 42.38, water: 44.78, bank: 46.38 }],
 measurements: [{ id: '1', level: 43.3, q: 3.6, date: '2026-10-01' }, { id: '2', level: 43.7, q: 7.6, date: '2026-10-04' }, { id: '3', level: 44.1, q: 12.7, date: '2026-10-08' }, { id: '4', level: 44.5, q: 19.1, date: '2026-10-12' }, { id: '5', level: 44.9, q: 27.2, date: '2026-10-16' }, { id: '6', level: 45.3, q: 36.3, date: '2026-10-20' }]
};
export const STORAGE_KEY = 'miqyas-project-v1';
export const MANNING_URL = 'https://www.hec.usace.army.mil/confluence/rasdocs/ras1dtechref/latest/stable-channel-design-functions/uniform-flow-computations/bed-roughness-functions';
