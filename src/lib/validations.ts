import { z } from 'zod';
export const designSchema = z.object({
 width: z.coerce.number().positive('عرض القاع يجب أن يكون أكبر من صفر'), side: z.coerce.number().min(0,'الميل لا يقل عن صفر'),
 bank: z.coerce.number().positive('ارتفاع القطاع يجب أن يكون موجبًا'), depth: z.coerce.number().positive('عمق المياه يجب أن يكون موجبًا'),
 bed: z.coerce.number().finite(), n: z.coerce.number().min(.005,'قيمة الخشونة صغيرة جدًا').max(.2,'قيمة الخشونة تتجاوز النطاق المسموح'),
 slope: z.coerce.number().positive('ميل الطاقة يجب أن يكون موجبًا').max(.1,'راجع قيمة الميل'), flood: z.coerce.number().finite()
}).refine(v => v.depth <= v.bank, { message: 'عمق المياه أكبر من ارتفاع القطاع', path: ['depth'] }).refine(v => v.flood > v.bed, { message: 'منسوب الفيضان يجب أن يكون فوق القاع', path: ['flood'] });
export const measurementSchema = z.object({ level: z.coerce.number().finite(), q: z.coerce.number().positive('أدخل تصرفًا أكبر من صفر'), date: z.string().min(1,'اختر تاريخ القياس') });
export const projectSchema = z.object({ name: z.string().trim().min(2,'أدخل اسمًا واضحًا للترعة'), location: z.string().trim().min(2,'أدخل موقع القطاع') });
export const csvSchema = z.object({ text: z.string().trim().min(1,'أدخل البيانات أو اختر ملف CSV') });
