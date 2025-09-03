import { ShieldHalf } from 'lucide-react';
import React from 'react'


export const LeaderboardEmptyState = ({ message }: { message: string }) => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-gradient-to-r from-slate-800 to-slate-70 rounded-lg border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShieldHalf className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{message}</h3>
    </div>
);
