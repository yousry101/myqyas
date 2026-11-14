export interface Design { width: number; side: number; bank: number; depth: number; bed: number; n: number; slope: number; flood: number }
export interface Point { x: number; z: number }
export interface Station { x: number; bed: number; water: number; bank: number }
export interface Measurement { id: string; level: number; q: number; date: string }
export interface Project { name: string; location: string; design: Design; points: Point[]; stations: Station[]; measurements: Measurement[]; source: 'design' | 'survey'; reference: 'absolute' | 'depth' }
export interface Geometry { area: number; perimeter: number; radius: number; topWidth: number; closed: boolean }
export interface HydraulicResult extends Geometry { q: number; velocity: number; froude: number }
export interface Calibration { a: number; b: number; r2: number; min: number; max: number }
