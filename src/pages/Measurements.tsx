import { Info } from 'lucide-react';
import { useProject } from '@/hooks/useProject';
import { bedLevel,calibrate } from '@/lib/hydraulics';
import PageHeading from '@/components/features/PageHeading';
import ProjectStrip from '@/components/features/ProjectStrip';
import MeasurementForm from '@/components/forms/MeasurementForm';
import MeasurementTable from '@/components/features/MeasurementTable';
import CurveChart from '@/components/features/CurveChart';
import CsvImport from '@/components/forms/CsvImport';
export default function Measurements() {
 const {project,update}=useProject(),bed=bedLevel(project),fit=calibrate(project.measurements,bed);
 const apply=(rows:number[][])=>{if(rows.some(r=>r[0]<=bed||r[1]<=0))return 'المناسيب المطلقة يجب أن تكون فوق القاع، والتصرفات موجبة.';update({measurements:rows.map(r=>({id:crypto.randomUUID(),level:r[0],q:r[1],date:new Date().toISOString().slice(0,10)})).sort((a,b)=>a.level-b.level)});};
 return <><PageHeading title="القياسات والمعايرة" description="وثّق القياسات الحقلية، وقارن التصرف النظري بالمرصود، وابنِ منحنى معايرة."/><ProjectStrip/>{fit?<div className="calibration"><strong>معايرة تجريبية بمناسيب قاع ثابتة</strong><div className="flex flex-wrap justify-between gap-3 mt-2"><span className="num">Q = {fit.a.toFixed(4)} × (H − {bed.toFixed(2)})<sup>{fit.b.toFixed(4)}</sup></span><span className="num">R² (log Q) = {fit.r2.toFixed(4)}</span><span>نطاق الرصد: <span className="num">{fit.min.toFixed(2)} – {fit.max.toFixed(2)}</span> م</span></div><p className="helper">انحدار خطي في المجال اللوغاريتمي. الصفر الهيدروليكي مفترض عند القاع، وليس مُعايرًا؛ لا تُستنبط نتائج خارج نطاق القياسات.</p></div>:<div className="notice"><Info size={18}/>أدخل ثلاثة قياسات صالحة على الأقل بمناسيب مختلفة لإجراء معايرة ذات أس موجب.</div>}<div className="data-layout"><div className="right-stack"><section className="panel no-print"><header className="panel-header"><h2>قياس حقلي جديد</h2><span className="badge">{project.reference==='absolute'?'منسوب مطلق':'عمق فوق القاع'}</span></header><MeasurementForm/></section><details className="panel no-print"><summary className="p-5 cursor-pointer text-sm font-medium">استيراد قياسات CSV</summary><CsvImport columns={2} initial="absolute_level_m,Q_m3_s\n43.3,3.6\n43.7,7.6\n44.1,12.7" help="ترتيب الأعمدة: المنسوب المطلق، التصرف (م³/ث). يستبدل السجل الحالي ويُسجّل تاريخ الاستيراد." onImport={apply}/></details></div><div className="right-stack"><CurveChart/><MeasurementTable/></div></div></>;
}
