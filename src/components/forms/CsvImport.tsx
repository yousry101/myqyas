import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, FileSpreadsheet, CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { csvSchema } from '@/lib/validations';
import { parseCsv } from '@/lib/hydraulics';
interface Props { columns:number; initial:string; help:string; onImport:(rows:number[][])=>string | void }
export default function CsvImport({columns,initial,help,onImport}:Props) {
 const {register,handleSubmit,setValue,formState:{errors}}=useForm<{text:string}>({resolver:zodResolver(csvSchema),defaultValues:{text:initial}}),[error,setError]=useState(''),fileRef=useRef<HTMLInputElement>(null);
 const submit=({text}:{text:string})=>{try{const rows=parseCsv(text,columns);const issue=onImport(rows);if(issue){setError(issue);toast.error(issue);return;}setError('');toast.success(`تم إدخال ${rows.length} صفوف بنجاح`);console.log('[Miqyas] CSV imported',rows.length);}catch(e){const message=e instanceof Error?e.message:'راجع تنسيق الملف';setError(message);toast.error(message);}};
 const loadFile=async(file?:File)=>{if(!file)return;if(file.size>1024*1024){toast.error('الحد الأقصى لحجم الملف 1 ميجابايت');return;}try{setValue('text',await file.text());setError('');toast.success('تم تحميل الملف. اضغط اعتماد البيانات لتطبيقه.');}catch{toast.error('تعذرت قراءة الملف. أعد اختيار ملف CSV نصي.');}};
 return <form onSubmit={handleSubmit(submit)} className="panel-body no-print"><div className="notice"><FileSpreadsheet size={18} className="shrink-0 mt-1"/><span>{help}<br/>فواصل مقبولة: فاصلة، فاصلة منقوطة، أو Tab. يمكن تضمين صف عناوين.</span></div><div className="field"><label htmlFor="csv-text">البيانات الرقمية — صف لكل نقطة أو محطة</label><textarea id="csv-text" className="text-area" {...register('text')} spellCheck={false} aria-invalid={!!errors.text||!!error}/>{(errors.text?.message||error)&&<p className="error flex gap-1"><CircleAlert size={16}/>{errors.text?.message||error}</p>}</div><input ref={fileRef} type="file" accept=".csv,.txt,text/csv" className="hidden" aria-label="اختيار ملف CSV" onChange={e=>{void loadFile(e.target.files?.[0]);e.target.value='';}}/><div className="data-actions"><button type="submit" className="btn btn-primary"><Upload size={16}/> اعتماد البيانات</button><button type="button" className="btn" onClick={()=>fileRef.current?.click()}><FileSpreadsheet size={16}/> تحميل CSV</button></div><p className="helper">اعتماد البيانات يستبدل الجدول الحالي. جميع الأطوال والمناسيب بالمتر.</p></form>;
}
