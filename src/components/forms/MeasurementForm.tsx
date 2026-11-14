import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useProject } from '@/hooks/useProject';
import { measurementSchema } from '@/lib/validations';
import { bedLevel } from '@/lib/hydraulics';
import Field from '@/components/forms/Field';
interface Inputs {level:number;q:number;date:string}
export default function MeasurementForm() {
 const {project,update}=useProject();const {register,handleSubmit,reset,setError,formState:{errors}}=useForm<Inputs>({resolver:zodResolver(measurementSchema),defaultValues:{date:new Date().toISOString().slice(0,10)}});
 const submit=(v:Inputs)=>{const level=project.reference==='depth'?bedLevel(project)+v.level:v.level;if(level<=bedLevel(project)){setError('level',{message:'يجب أن يكون القياس فوق منسوب القاع'});return;}update({measurements:[...project.measurements,{...v,level,id:crypto.randomUUID()}].sort((a,b)=>a.level-b.level)});reset({date:v.date});toast.success('تمت إضافة القياس وتحديث المعايرة');};
 return <form className="panel-body" onSubmit={handleSubmit(submit)}><div className="form-grid"><Field label={project.reference==='absolute'?'المنسوب المطلق':'العمق فوق القاع'} unit="م" registration={register('level')} error={errors.level?.message}/><Field label="التصرف المرصود" unit="م³/ث" registration={register('q')} error={errors.q?.message}/><div className="col-span-2"><Field label="تاريخ القياس" type="date" registration={register('date')} error={errors.date?.message}/></div></div><button type="submit" className="btn btn-primary mt-5 w-full"><Plus size={17}/> إضافة قياس</button><p className="helper">تُحفظ القياسات كمناسيب مطلقة، ويُحوّل العمق تلقائيًا باستخدام منسوب قاع القطاع الحالي.</p></form>;
}
