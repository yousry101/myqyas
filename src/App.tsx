import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProjectProvider } from '@/hooks/useProject';
import Layout from '@/components/layout/Layout';
import ErrorBoundary from '@/components/features/ErrorBoundary';
import Overview from '@/pages/Overview';
import NotFound from '@/pages/NotFound';
const Survey=lazy(()=>import('@/pages/Survey'));
const Longitudinal=lazy(()=>import('@/pages/Longitudinal'));
const Measurements=lazy(()=>import('@/pages/Measurements'));
const References=lazy(()=>import('@/pages/References'));
export default function App(){return <ErrorBoundary><ProjectProvider><BrowserRouter><Suspense fallback={<div dir="rtl" className="p-12 text-primary">جارٍ تحميل مساحة التحليل…</div>}><Routes><Route element={<Layout/>}><Route path="/" element={<Overview/>}/><Route path="/survey" element={<Survey/>}/><Route path="/longitudinal" element={<Longitudinal/>}/><Route path="/measurements" element={<Measurements/>}/><Route path="/references" element={<References/>}/><Route path="*" element={<NotFound/>}/></Route></Routes></Suspense></BrowserRouter><Toaster position="bottom-left" dir="rtl" richColors closeButton/></ProjectProvider></ErrorBoundary>;}
