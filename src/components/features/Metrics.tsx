import { Waves, MoveVertical, Gauge, Droplets, ArrowUpRight, Check } from 'lucide-react';
import { useProject } from '@/hooks/useProject';
import { calculate,bedLevel } from '@/lib/hydraulics';
export default function Metrics() {
 const {project}=useProject(), result=calculate(project); const values=[{label:'التصرف المحسوب',value:result.q.toFixed(2),unit:'م³/ث',icon:Waves,note:'حسب معادلة ماننج · SI',featured:true},{label:'منسوب سطح المياه',value:(bedLevel(project)+project.design.depth).toFixed(2),unit:'م',icon:MoveVertical,note:`عمق المياه ${project.design.depth.toFixed(2)} م`,featured:false},{label:'متوسط سرعة المياه',value:result.velocity.toFixed(3),unit:'م/ث',icon:Gauge,note:'V = Q / A',featured:false},{label:'مساحة القطاع المبتل',value:result.area.toFixed(2),unit:'م²',icon:Droplets,note:`نصف القطر الهيدروليكي ${result.radius.toFixed(3)} م`,featured:false}];
 return <section className="metric-grid" aria-label="ملخص النتائج">{values.map(({label,value,unit,icon:Icon,note,featured})=><article key={label} className={`metric ${featured?'featured':''}`}><div className="metric-top"><span>{label}</span><Icon size={18} strokeWidth={1.6}/></div><div className="metric-value"><span className="num">{value}</span><small>{unit}</small></div><div className="metric-note">{featured?<Check size={12}/>:<ArrowUpRight size={12}/>}<span>{note}</span></div></article>)}</section>;
}
