"use client"; // Ensure this component is rendered on the client-side

import React from 'react';
import Link from 'next/link'; // Use Next.js Link for client-side navigation

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Andha Tufaan</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</Link>
          </li>
          <li>
            <Link href="/map" className="hover:bg-gray-700 px-3 py-2 rounded">Map</Link>
          </li>
          <li>
            <Link href="/settings" className="hover:bg-gray-700 px-3 py-2 rounded">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
    
  );
}
