import { TriangleAlert } from 'lucide-react';
import PageHeading from '@/components/features/PageHeading';
import ProjectStrip from '@/components/features/ProjectStrip';
import Metrics from '@/components/features/Metrics';
import DesignForm from '@/components/forms/DesignForm';
import CurveChart from '@/components/features/CurveChart';
import CrossSection from '@/components/features/CrossSection';
import { useProject } from '@/hooks/useProject';
import { calculate,capacityDepth } from '@/lib/hydraulics';
export default function Overview() { const {project}=useProject(),r=calculate(project); return <><PageHeading title="علاقة المنسوب والتصرف" description="من بيانات القطاع إلى قرار أدق. احسب التصرف وراجع سلوك الجريان في ترعتك."/><ProjectStrip/><Metrics/>{!r.closed&&<div className="notice"><TriangleAlert size={19}/>منسوب المياه يتجاوز حافة القطاع. الحساب خارج نطاق القطاع غير معتمد؛ خفّض العمق إلى {capacityDepth(project).toFixed(2)} م أو استكمل الرفع.</div>}<div className="analysis-grid"><DesignForm/><div className="right-stack"><CurveChart/><CrossSection/></div></div><p className="report-only report-disclaimer mt-4">الافتراضات: جريان مستقر ومنتظم، خشونة ثابتة، ميل طاقة موجب. لا يمثل هذا النموذج تأثير القناطر أو الردم أو الجريان غير المستقر. البيانات الابتدائية توضيحية وليست بيانات رسمية للترعة. المرجع: USACE HEC-RAS، Manning Equation؛ المعامل 1 في الوحدات الدولية.</p></>; }
