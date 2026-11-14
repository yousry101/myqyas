import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { DEFAULT_PROJECT, STORAGE_KEY } from '@/constants/defaults';
import { designSchema } from '@/lib/validations';
import type { Project } from '@/types/hydraulics';
const persistedSchema = z.object({ name:z.string(), location:z.string(), design:designSchema, source:z.enum(['design','survey']), reference:z.enum(['absolute','depth']), points:z.array(z.object({x:z.number(),z:z.number()})).min(2), stations:z.array(z.object({x:z.number(),bed:z.number(),water:z.number(),bank:z.number()})).min(2), measurements:z.array(z.object({id:z.string(),level:z.number(),q:z.number().positive(),date:z.string()})) });
interface ProjectContextType { project: Project; update: (patch: Partial<Project>) => void; saved: boolean; save: () => void; reset: () => void }
const ProjectContext = createContext<ProjectContextType | null>(null);
function load(): Project {
 const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return DEFAULT_PROJECT;
 const decoded = z.string().transform((s,ctx) => { try { return JSON.parse(s) as unknown; } catch { ctx.addIssue({code:z.ZodIssueCode.custom,message:'Invalid saved data'}); return z.NEVER; } }).safeParse(raw);
 if (!decoded.success) return DEFAULT_PROJECT;
 const checked = persistedSchema.safeParse(decoded.data); if (!checked.success) return DEFAULT_PROJECT;
 if (checked.data.points.some((p,i,a)=>i>0 && p.x<=a[i-1].x)) return DEFAULT_PROJECT;
 return checked.data;
}
export function ProjectProvider({ children }: { children: ReactNode }) {
 const [project, setProject] = useState<Project>(load), [saved, setSaved] = useState(true);
 const update = (patch: Partial<Project>) => { console.log('[Miqyas] Project updated', Object.keys(patch)); setProject(p => ({ ...p, ...patch })); setSaved(false); };
 useEffect(() => { const timer = setTimeout(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(project)); setSaved(true); } catch { toast.error('تعذر الحفظ المحلي. صدّر البيانات قبل إغلاق الصفحة.'); } },600); return () => clearTimeout(timer); },[project]);
 const save = () => { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(project)); setSaved(true); toast.success('تم حفظ المشروع في هذا المتصفح'); } catch { toast.error('المتصفح لا يسمح بالحفظ المحلي'); } };
 const reset = () => { setProject(structuredClone(DEFAULT_PROJECT)); toast.success('تمت استعادة البيانات التوضيحية'); };
 return <ProjectContext.Provider value={{ project, update, saved, save, reset }}>{children}</ProjectContext.Provider>;
}
export function useProject() { const value = useContext(ProjectContext); if (!value) throw new Error('Project provider missing'); return value; }
