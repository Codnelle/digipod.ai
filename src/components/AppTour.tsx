"use client";

import React from 'react';

type TourStep = {
	id: string;
	title: string;
	description: string;
};

interface AppTourProps {
	open: boolean;
	steps: TourStep[];
	onClose: () => void;
}

export default function AppTour({ open, steps, onClose }: AppTourProps) {
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		if (!open) setIndex(0);
	}, [open]);

	if (!open) return null;

	const step = steps[index];
	const isLast = index === steps.length - 1;

	return (
		<div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-gray-900 text-blue-100 max-w-lg w-full rounded-2xl border border-blue-900 shadow-2xl p-6">
				<div className="text-xs text-blue-300 mb-2">Step {index + 1} of {steps.length}</div>
				<h3 className="text-2xl font-bold mb-2">{step.title}</h3>
				<p className="text-blue-200 mb-6 leading-relaxed">{step.description}</p>
				<div className="flex items-center justify-between">
					<button
						onClick={() => {
							localStorage.setItem('digipod-tour-complete', '1');
							onClose();
						}}
						className="text-sm text-blue-300 hover:text-blue-200"
						aria-label="Skip tour"
					>
						Skip
					</button>
					<div className="flex gap-2">
						{index > 0 && (
							<button
								onClick={() => setIndex(i => Math.max(0, i - 1))}
								className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-blue-900"
							>
								Back
							</button>
						)}
						<button
							onClick={() => {
								if (!isLast) {
									setIndex(i => Math.min(steps.length - 1, i + 1));
								} else {
									localStorage.setItem('digipod-tour-complete', '1');
									onClose();
								}
							}}
							className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 border border-blue-500 text-white"
						>
							{isLast ? 'Done' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
} 