import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import serviceWorkerDev from './serviceWorkerDev.js';

import App from './App.jsx';
import Login from './pages/LoginPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import LaboratoryPage from './pages/LaboratoryPage.jsx';
import ConsultationPage from './pages/ConsultationPage.jsx';
import RadiologyPage from './pages/RadiologyPage.jsx';
import MedicationPage from './pages/MedicationPage.jsx';
import MedicalRecordsPage from './pages/MedicalRecordsPage.jsx';
import AppointmentsPage from './pages/AppointmentsPage.jsx';
import LabResultPage from './pages/LabResultPage.jsx';

import './index.css';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/authenticate/:patientId',
    element: <AuthPage />,
  },
  {
    path: '/dashboard/:patientId',
    element: <Dashboard />,
  },
  {
    path: '/dashboard/:patientId/laboratory',
    element: <LaboratoryPage />,
    children: [
      {
        path: ':labId',
        element: <LabResultPage />,
      },
    ],
  },
  {
    path: '/dashboard/:patientId/consultation',
    element: <ConsultationPage />,
  },
  {
    path: '/dashboard/:patientId/radiology',
    element: <RadiologyPage />,
  },
  {
    path: '/dashboard/:patientId/medication',
    element: <MedicationPage />,
  },
  {
    path: '/dashboard/:patientId/medical_records',
    element: <MedicalRecordsPage />,
  },
  {
    path: '/dashboard/:patientId/appointments',
    element: <AppointmentsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerDev();