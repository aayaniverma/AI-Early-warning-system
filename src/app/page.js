"use client"; // Add this at the top

import { useRouter } from 'next/navigation';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Dashboard />
    </div>
  );
}
