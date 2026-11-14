import { NavLink } from 'react-router-dom';
import { Waves, ChartNoAxesCombined, ScanLine, Route, Table2, BookOpen, ShieldCheck, ChevronLeft, UserRound, X } from 'lucide-react';
interface Props { open: boolean; close: () => void }
const links = [{ to:'/', label:'المنسوب والتصرف', icon:ChartNoAxesCombined },{to:'/survey',label:'القطاعات المرفوعة',icon:ScanLine},{to:'/longitudinal',label:'القطاع الطولي',icon:Route},{to:'/measurements',label:'القياسات والمعايرة',icon:Table2},{to:'/references',label:'المعادلات والمراجع',icon:BookOpen}];
export default function Sidebar({open,close}: Props) { return <>
 {open && <button className="overlay" onClick={close} aria-label="إغلاق القائمة"/>}
 <aside className={`sidebar ${open?'open':''}`}>
  <div className="brand"><span className="brand-symbol"><Waves size={29}/></span><div><div className="brand-name">مِقياس</div><small className="num">MIQYAS HYDRAULICS</small></div><button className="icon-btn mobile-toggle" onClick={close} aria-label="إغلاق"><X size={18}/></button></div>
  <p className="nav-caption">مساحة التحليل</p><nav aria-label="التنقل الرئيسي">{links.map(({to,label,icon:Icon})=><NavLink end={to==='/'} to={to} onClick={close} key={to} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={19} strokeWidth={1.7}/><span>{label}</span></NavLink>)}</nav>
  <div className="sidebar-bottom"><div className="rail-note"><ShieldCheck size={19} className="mb-2"/><strong>حسابات تستند إلى مراجع موثّقة</strong><p>الوحدات الدولية SI · معادلة ماننج<br/>الجريان المستقر والمنتظم</p><NavLink to="/references" className="inline-flex items-center gap-2 mt-3">استعراض المراجع <ChevronLeft size={13}/></NavLink></div><div className="user"><span className="avatar"><UserRound size={19}/></span><div>مساحة المهندس<p className="text-xs opacity-70 mt-1">مشروع محلي · بدون تسجيل</p></div></div></div>
 </aside>
 </>; }
