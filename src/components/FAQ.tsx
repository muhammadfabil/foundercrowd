"use client";
import React, { useState, useEffect, useRef } from 'react';

const faqData = [
	{
		id: 1,
		question: 'Apa itu FounderCrowd?',
		answer: 'FounderCrowd adalah platform fundraising komprehensif yang membantu startup menghubungkan diri dengan investor dan komunitas.',
	},
	{
		id: 2,
		question: 'Bagaimana cara kerja FounderCrowd?',
		answer: 'Startup dapat membuat profil, mengunggah pitch, dan berinteraksi dengan investor melalui fitur yang tersedia di platform.',
	},
	{
		id: 3,
		question: 'Siapa saja yang dapat menggunakan FounderCrowd?',
		answer: 'FounderCrowd dapat digunakan oleh pendiri startup, investor, dan siapa saja yang tertarik dengan dunia startup.',
	},
	{
		id: 4,
		question: 'Apakah FounderCrowd berbayar?',
		answer: 'FounderCrowd menyediakan paket gratis dan berbayar dengan fitur tambahan untuk kebutuhan fundraising yang lebih lanjut.',
	},
	{
		id: 5,
		question: 'Bagaimana keamanan data di FounderCrowd?',
		answer: 'Kami menggunakan enkripsi dan standar keamanan industri untuk melindungi data pengguna di platform kami.',
	},
	{
		id: 6,
		question: 'Bagaimana cara menghubungi tim FounderCrowd?',
		answer: 'Anda dapat menghubungi kami melalui halaman kontak di website atau email support@foundercrowd.com.',
	},
	{
		id: 7,
		question: 'Apakah FounderCrowd tersedia untuk startup di luar Indonesia?',
		answer: 'Saat ini FounderCrowd fokus pada pasar Indonesia, namun kami berencana untuk ekspansi ke negara lain di masa depan.',
	},
];

const FAQ = () => {
		const [openFAQ, setOpenFAQ] = useState<number | null>(null);
		const [visibleItems, setVisibleItems] = useState<number[]>([]);
		const [showCTA, setShowCTA] = useState(false);
		const [scrollProgress, setScrollProgress] = useState(0);
		const [isClosing, setIsClosing] = useState(false);

		const sectionRef = useRef<HTMLElement>(null);
		const lastFAQRef = useRef<HTMLDivElement>(null);

		// Progressive animation for FAQ items
		useEffect(() => {
			const timer = setTimeout(() => {
				faqData.forEach((_, index) => {
					setTimeout(() => {
						setVisibleItems((prev) => [...prev, index]);
					}, index * 150);
				});
			}, 300);

			return () => clearTimeout(timer);
		}, []);

		// Scroll listener to detect when last FAQ is at middle of screen
		useEffect(() => {
			const handleScroll = () => {
				if (!lastFAQRef.current) return;

				const lastFAQRect = lastFAQRef.current.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const middleOfScreen = windowHeight / 2;

				// Check if the last FAQ item has crossed the middle of the screen
				const lastFAQTop = lastFAQRect.top;

				if (lastFAQTop <= middleOfScreen) {
					// Calculate progress based on how far the last FAQ has moved past the middle
					const progressDistance = windowHeight * 0.3; // Distance over which to animate
					const currentProgress = Math.min(
						1,
						Math.max(0, (middleOfScreen - lastFAQTop) / progressDistance)
					);

					setScrollProgress(currentProgress);
					setShowCTA(true);
					setIsClosing(false);
				} else {
					// User scrolled back up
					if (showCTA) {
						setIsClosing(true);
						// Animate closing
						const closeProgress = Math.max(0, 1 - (lastFAQTop - middleOfScreen) / (windowHeight * 0.2));
						setScrollProgress(closeProgress);
						
						// Hide CTA after animation completes
						if (closeProgress <= 0) {
							setTimeout(() => {
								setShowCTA(false);
								setIsClosing(false);
							}, 300);
						}
					} else {
						setScrollProgress(0);
						setShowCTA(false);
						setIsClosing(false);
					}
				}
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll(); // Check initial position

			return () => window.removeEventListener('scroll', handleScroll);
		}, [showCTA]);

		const toggleFAQ = (id: number) => {
			setOpenFAQ(openFAQ === id ? null : id);
		};

		return (
			<div className="relative">
				{/* FAQ Section */}
				<section
					ref={sectionRef}
					id="faq-section"
					className="relative bg-white z-10"
				>
					<div className="py-20 font-montserrat">
						<div className="max-w-7xl mx-auto px-4">
							{/* Header */}
							<div className="mb-16 transform transition-all duration-1000 ease-out animate-fadeInUp">
								<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
									FAQs
								</h2>
								<div className="w-full h-px bg-gray-300"></div>
							</div>

							{/* FAQ Items */}
							<div className="space-y-0">
								{faqData.map((faq, index) => (
									<div
										key={faq.id}
										ref={index === faqData.length - 1 ? lastFAQRef : null}
										className={`
                    border-b border-gray-300 transform transition-all duration-700 ease-out
                    ${visibleItems.includes(index)
											? 'translate-y-0 opacity-100'
											: 'translate-y-8 opacity-0'
										}
                  `}
										style={{ transitionDelay: `${index * 100}ms` }}
									>
										<button
											onClick={() => toggleFAQ(faq.id)}
											className="w-full py-8 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50 transition-all duration-300 group"
										>
											<h3 className="text-xl lg:text-2xl font-normal text-gray-900 pr-8 flex-1 group-hover:text-[#AC5B0F] transition-colors duration-300">
												{faq.question}
											</h3>
											<div className="flex-shrink-0 ml-8">
												<div
													className={`
                        w-8 h-8 flex items-center justify-center transition-all duration-500 ease-in-out
                        ${openFAQ === faq.id ? 'rotate-45 bg-[#AC5B0F] rounded-full' : 'rotate-0 hover:bg-gray-100 rounded-full'}
                      `}
												>
													<svg
														className={`w-6 h-6 transition-colors duration-300 ${
															openFAQ === faq.id
																? 'text-white'
																: 'text-gray-600 group-hover:text-[#AC5B0F]'
														}`}
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M12 4v16m8-8H4"
														/>
													</svg>
												</div>
											</div>
										</button>

										{/* Answer */}
										<div
											className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
										>
											<div className="pb-8 pr-16 transform transition-all duration-300 ease-out">
												<p className="text-gray-600 leading-relaxed text-lg animate-slideIn">
													{faq.answer}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

						
						</div>
					</div>
				</section>

				{/* CTA Section - With smooth open/close transitions */}
				{showCTA && (
					<section 
						className="relative min-h-screen bg-gradient-to-br from-purple-200 via-orange-200 to-purple-300 z-20 overflow-hidden"
						style={{
							transform: `translateY(${100 - scrollProgress * 100}%)`,
							transition: isClosing 
								? 'transform 0.6s cubic-bezier(0.4, 0.0, 0.6, 1)' 
								: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
						}}
					>
						{/* Background overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-orange-100/80 to-purple-200/80 backdrop-blur-sm"></div>

						<div className="relative z-10 min-h-screen flex items-center justify-center text-center px-4 max-w-4xl mx-auto">
							<div
								className="transform transition-all duration-1000 ease-out"
								style={{
									opacity: isClosing ? Math.max(0, scrollProgress) : scrollProgress,
									transform: `translateY(${(1 - scrollProgress) * (isClosing ? 30 : 20)}px) scale(${0.95 + scrollProgress * 0.05})`,
									transition: isClosing 
										? 'all 0.6s cubic-bezier(0.4, 0.0, 0.6, 1)' 
										: 'all 1s ease-out',
								}}
							>
								<h1 
									className="text-5xl lg:text-7xl font-bold text-gray-900 mb-12 leading-tight"
									style={{
										transform: isClosing ? `scale(${0.98 + scrollProgress * 0.02})` : 'scale(1)',
										transition: 'transform 0.6s ease-out',
									}}
								>
									Jadi, apa yang kita
									<br />
									<span className="text-orange-600">bangun?</span>
								</h1>

								<div
									className="transform transition-all duration-700 ease-out"
									style={{
										opacity: (isClosing ? scrollProgress * 2 : scrollProgress) > 0.5 ? 1 : 0,
										transform: `translateY(${(isClosing ? scrollProgress * 2 : scrollProgress) > 0.5 ? 0 : 10}px)`,
										transitionDelay: isClosing ? '0ms' : '300ms',
									}}
								>
									<button className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 px-12 py-4 rounded-full font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl">
										Mulai membangun
									</button>
								</div>
							</div>
						</div>
					</section>
				)}

				<style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
			</div>
		);
};

export default FAQ;