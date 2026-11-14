import { Link } from 'react-router-dom';
import { MapPinOff } from 'lucide-react';
export default function NotFound(){return <div className="panel panel-body text-center py-16"><MapPinOff className="mx-auto text-primary mb-4" size={40}/><h1>الصفحة غير موجودة</h1><p className="description">ارجع إلى مساحة التحليل لاستكمال المشروع.</p><Link className="btn btn-primary mt-6" to="/">المنسوب والتصرف</Link></div>;}
