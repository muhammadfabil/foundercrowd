"use client";
import React, { useState, useEffect, useRef } from 'react';

// First, set a default Calendly URL at the top level
const DEFAULT_CALENDLY_URL = "https://calendly.com/spacefunding/raise-capital-online";

const faqData = [
  {
    id: 1,
    question: 'What is FounderCrowd?',
    answer: 'FounderCrowd is a comprehensive fundraising platform that helps startups connect with investors and the community.',
  },
  {
    id: 2,
    question: 'How does FounderCrowd work?',
    answer: 'Startups can create profiles, upload pitches, and interact with investors through features available on the platform.',
  },
  {
    id: 3,
    question: 'Who can use FounderCrowd?',
    answer: 'FounderCrowd can be used by startup founders, investors, and anyone interested in the startup world.',
  },
  {
    id: 4,
    question: 'Is FounderCrowd paid?',
    answer: 'FounderCrowd offers free and paid plans with additional features for more advanced fundraising needs.',
  },
  {
    id: 5,
    question: 'How is data security handled on FounderCrowd?',
    answer: 'We use encryption and industry-standard security measures to protect user data on our platform.',
  },
  {
    id: 6,
    question: 'How can I contact the FounderCrowd team?',
    answer: 'You can contact us through the contact page on our website or by emailing support@foundercrowd.com.',
  },
  {
    id: 7,
    question: 'Is FounderCrowd available for startups outside Indonesia?',
    answer: 'Currently, FounderCrowd focuses on the Indonesian market, but we plan to expand to other countries in the future.',
  },
];

// Add the CalendlyModal component from HorizontalHook
function CalendlyModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    
    // Add the Calendly script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Handle loading state
    script.onload = () => {
      // Short timeout to ensure widget initialization
      setTimeout(() => setIsLoading(false), 1000);
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.removeEventListener("keydown", onEsc);
      // Clean up script if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] grid place-items-center p-4" // Increased z-index to be above navbar
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#AC5B0F]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#8A490C]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-sm font-medium text-white">Book a call</h3>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-xs bg-white/10 hover:bg-white/15 text-white"
          >
            Close
          </button>
        </div>
        <div className="h-[70vh] min-h-[600px] relative">
          {/* Loading animation */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#8A490C] z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                <p className="mt-4 text-white/80 text-sm">Loading calendar...</p>
              </div>
            </div>
          )}
          
          {/* Use the Calendly inline widget div structure */}
          <div 
            className="calendly-inline-widget h-full w-full" 
            data-url={url}
          ></div>
        </div>
      </div>
    </div>
  );
}

const FAQ = ({ calendlyUrl = DEFAULT_CALENDLY_URL }) => {
		const [openFAQ, setOpenFAQ] = useState<number | null>(null);
		const [visibleItems, setVisibleItems] = useState<number[]>([]);
		const [showCTA, setShowCTA] = useState(false);
		const [scrollProgress, setScrollProgress] = useState(0);
		const [isClosing, setIsClosing] = useState(false);
		const [openCalendly, setOpenCalendly] = useState(false);

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
									So, Ready to Raise 
									<br />
									<span className="text-orange-600">The Capital Fund?</span>
								</h1>

								<div
									className="transform transition-all duration-700 ease-out"
									style={{
										opacity: (isClosing ? scrollProgress * 2 : scrollProgress) > 0.5 ? 1 : 0,
										transform: `translateY(${(isClosing ? scrollProgress * 2 : scrollProgress) > 0.5 ? 0 : 10}px)`,
										transitionDelay: isClosing ? '0ms' : '300ms',
									}}
								>
									<button 
										onClick={() => setOpenCalendly(true)} 
										className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-gray-800 px-12 py-4 rounded-full font-semibold text-lg hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
									>
										Start Raising
									</button>
								</div>
							</div>
						</div>
					</section>
				)}

				{/* Calendly Modal */}
				{openCalendly && (
					<CalendlyModal 
						url={calendlyUrl} 
						onClose={() => setOpenCalendly(false)} 
					/>
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