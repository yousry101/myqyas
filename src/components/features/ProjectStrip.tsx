import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, ChevronDown, Waves, X } from 'lucide-react';
import { toast } from 'sonner';
import { useProject } from '@/hooks/useProject';
import { projectSchema } from '@/lib/validations';
import Field from '@/components/forms/Field';
interface ProjectInfo { name:string; location:string }
export default function ProjectStrip() {
 const {project,update}=useProject(), [editing,setEditing]=useState(false); const {register,handleSubmit,formState:{errors}}=useForm<ProjectInfo>({resolver:zodResolver(projectSchema),defaultValues:{name:project.name,location:project.location}});
 return <><div className="project-strip"><div className="project-info"><span className="project-icon"><Waves size={22}/></span><div><h3>{project.name} <span className="badge mr-2">بيانات توضيحية قابلة للتعديل</span></h3><span className="description inline-flex items-center gap-1 !mt-0 !text-xs"><MapPin size={12}/>{project.location}</span></div></div><div className="project-meta"><span>المرجع: <strong className="text-foreground font-medium">{project.reference==='absolute'?'منسوب مطلق':'عمق فوق القاع'}</strong></span><span>نظام الوحدات: <strong className="num text-foreground">SI</strong></span></div><button className="icon-btn no-print" aria-label="تعديل معلومات المشروع" onClick={()=>setEditing(!editing)}>{editing?<X size={18}/>:<ChevronDown size={18}/>}</button></div>{editing&&<form className="panel panel-body mb-5 no-print" onSubmit={handleSubmit(v=>{update(v);setEditing(false);toast.success('تم تحديث معلومات المشروع');})}><div className="form-grid"><Field label="اسم الترعة" type="text" registration={register('name')} error={errors.name?.message}/><Field label="موقع القطاع والمحطة" type="text" registration={register('location')} error={errors.location?.message}/></div><button className="btn mt-4" type="submit">حفظ المعلومات</button></form>}</>;
}
