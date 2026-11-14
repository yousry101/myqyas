import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChevronLeft, Menu, FolderOpen, Save, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { useProject } from '@/hooks/useProject';
const names: Record<string,string> = {'/':'المنسوب والتصرف','/survey':'القطاعات المرفوعة','/longitudinal':'القطاع الطولي','/measurements':'القياسات والمعايرة','/references':'المعادلات والمراجع'};
export default function Layout() {
 const [open,setOpen] = useState(false), {saved,save} = useProject(); const {pathname}=useLocation();
 return <div className="app-layout" dir="rtl"><Sidebar open={open} close={()=>setOpen(false)}/><header className="topbar"><div className="breadcrumbs"><button className="icon-btn mobile-toggle" onClick={()=>setOpen(true)} aria-label="فتح القائمة"><Menu size={22}/></button><FolderOpen size={17}/><span>مساحة العمل</span><ChevronLeft size={14}/><strong className="text-foreground font-medium">{names[pathname] || 'الصفحة غير موجودة'}</strong></div><div className="top-actions"><span className="text-xs text-muted-foreground save-text"><i className="status-dot"/>{saved?'محفوظ محليًا':'جارٍ الحفظ'}</span><button className="icon-btn" onClick={save} aria-label="حفظ المشروع" title="حفظ المشروع"><Save size={19}/></button><Link className="icon-btn" to="/references" aria-label="مساعدة ومراجع"><CircleHelp size={19}/></Link></div></header><main className="workspace"><Outlet/><footer className="workspace-footer"><span>مِقياس — أدوات هندسية لإدارة المياه في مصر</span><span>النتائج استرشادية وتستلزم مراجعة مهندس مختص <span className="num">· V1.0</span></span></footer></main></div>;
}
