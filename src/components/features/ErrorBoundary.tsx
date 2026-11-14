import { Component, type ReactNode, type ErrorInfo } from 'react';
interface Props { children: ReactNode }
interface State { failed:boolean }
export default class ErrorBoundary extends Component<Props,State> {
 state:State={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(error:Error,info:ErrorInfo){console.error('[Miqyas] Render error',error,info);}
 render(){if(this.state.failed)return <main dir="rtl" className="p-10"><h1>تعذّر عرض التحليل</h1><p className="description">أعد تحميل الصفحة. البيانات المحفوظة محليًا لن تُحذف.</p><button className="btn mt-5" onClick={()=>{this.setState({failed:false});}}>إعادة المحاولة</button></main>;return this.props.children;}
}
