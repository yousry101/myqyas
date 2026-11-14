import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SlidersHorizontal, Ruler, Waves, Calculator, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useProject } from '@/hooks/useProject';
import { designSchema } from '@/lib/validations';
import type { Design } from '@/types/hydraulics';
import Field from '@/components/forms/Field';
export default function DesignForm() {
 const {project,update}=useProject(); const {register,handleSubmit,reset,formState:{errors}}=useForm<Design>({resolver:zodResolver(designSchema),defaultValues:project.design});
 useEffect(()=>reset(project.design),[project.design,reset]);
 const field=(name:keyof Design,label:string,unit?:string)=><Field label={label} unit={unit} registration={register(name)} error={errors[name]?.message}/>;
 return <section className="panel"><header className="panel-header"><h2 className="flex items-center gap-2"><SlidersHorizontal size={17}/> بيانات القطاع</h2><span className="badge">مدخلات</span></header><div className="tabs no-print"><button className={`tab ${project.source==='design'?'active':''}`} onClick={()=>update({source:'design'})}>قطاع تصميمي</button><button className={`tab ${project.source==='survey'?'active':''}`} onClick={()=>update({source:'survey'})}>قطاع مرفوع</button></div><form className="panel-body" onSubmit={handleSubmit(v=>{update({design:v});toast.success('تم تحديث الحسابات والرسوم');})}>
 <div className="form-section"><p className="form-section-title"><Ruler size={14}/> هندسة القطاع</p>{project.source==='design'?<div className="form-grid">{field('width','عرض القاع b','م')}{field('side','ميل الجوانب z','H:V')}{field('bank','ارتفاع القطاع','م')}{field('bed','منسوب القاع','م')}</div>:<div className="notice !mb-0 text-xs"><Info size={17} className="shrink-0 mt-1"/>تُحسب المساحة والمحيط من النقاط المُدخلة في صفحة القطاعات المرفوعة. منسوب القاع هو أدنى نقطة.</div>}</div>
 <div className="form-section"><p className="form-section-title"><Waves size={14}/> خصائص الجريان</p><div className="form-grid">{field('depth','عمق المياه y','م')}{field('n','خشونة ماننج n')}{field('slope','ميل الطاقة S','م/م')}{field('flood','منسوب الفيضان','م')}</div><p className="helper">ميل الجوانب أفقي : رأسي. ميل الطاقة يساوي ميل القاع فقط في الجريان المنتظم.</p></div>
 <div className="field no-print"><label htmlFor="reference">عرض محور المنسوب</label><select id="reference" value={project.reference} onChange={e=>update({reference:e.target.value as 'absolute'|'depth'})}><option value="absolute">منسوب مطلق (م)</option><option value="depth">عمق فوق القاع (م)</option></select></div><button className="btn btn-primary w-full mt-4 no-print" type="submit"><Calculator size={17}/> تحديث الحسابات</button><div className="equation-box"><span className="num">Q = (1/n) A R<sup>2/3</sup> S<sup>1/2</sup></span><p>معادلة ماننج · الجريان المنتظم</p></div></form></section>;
}
