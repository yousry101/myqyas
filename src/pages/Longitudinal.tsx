import { Download, Info } from 'lucide-react';
import { useProject } from '@/hooks/useProject';
import { downloadCsv } from '@/lib/hydraulics';
import PageHeading from '@/components/features/PageHeading';
import ProjectStrip from '@/components/features/ProjectStrip';
import CsvImport from '@/components/forms/CsvImport';
import LongitudinalChart from '@/components/features/LongitudinalChart';
export default function Longitudinal() {
 const {project,update}=useProject();const rows=project.stations.map(s=>[s.x,s.bed,s.water,s.bank]);const meanSlope=(project.stations[0].bed-project.stations[project.stations.length-1].bed)/(project.stations[project.stations.length-1].x-project.stations[0].x);
 const apply=(data:number[][])=>{if(data.length<2)return 'أدخل محطتين على الأقل.';if(data.some((r,i)=>i>0&&r[0]<=data[i-1][0]))return 'المحطات يجب أن تكون متزايدة دون تكرار.';if(data.some(r=>r[2]<r[1]||r[3]<r[1]))return 'منسوب المياه والجسر لا يقل عن القاع.';update({stations:data.map(r=>({x:r[0],bed:r[1],water:r[2],bank:r[3]}))});};
 return <><PageHeading title="القطاعات الطولية" description="راجع استمرارية مناسيب القاع والمياه والجسر، محطةً بمحطة."/><ProjectStrip/><div className="notice"><Info size={18} className="shrink-0 mt-1"/><span>متوسط ميل القاع من أول محطة إلى آخر محطة: <strong className="num">{meanSlope.toFixed(6)}</strong> م/م. لا يُستخدم تلقائيًا كميل طاقة في حساب ماننج.</span></div><div className="data-layout"><section className="panel"><header className="panel-header"><h2>بيانات المحطات الطولية</h2></header><CsvImport columns={4} initial={'station_m,bed_m,water_m,bank_m\n'+rows.map(r=>r.join(',')).join('\n')} help="ترتيب الأعمدة: المحطة الطولية، منسوب القاع، منسوب المياه، منسوب الجسر." onImport={apply}/></section><div className="right-stack"><LongitudinalChart/><section className="panel"><header className="panel-header"><h2>جدول المناسيب</h2><button className="icon-btn no-print" aria-label="تصدير القطاع الطولي" onClick={()=>downloadCsv('longitudinal.csv',[['station_m','bed_m','water_m','bank_m'],...rows])}><Download size={17}/></button></header><div className="table-wrap"><table><thead><tr><th>المحطة (م)</th><th>القاع (م)</th><th>المياه (م)</th><th>الجسر (م)</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j}><span className="num">{v.toFixed(2)}</span></td>)}</tr>)}</tbody></table></div></section></div></div></>;
}
