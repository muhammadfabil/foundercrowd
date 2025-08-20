"use client";
import React, { useState } from 'react';

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

const FAQ = () => {
		const [openFAQ, setOpenFAQ] = useState<number | null>(null);

		const toggleFAQ = (id: number) => {
			setOpenFAQ(openFAQ === id ? null : id);
		};

		return (
			<section className="py-24 bg-white font-figtree">
				<div className="max-w-4xl mx-auto px-4">
					{/* Header */}
					<div className="text-center mb-20">
						<h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-tight">
							Frequently Asked Questions
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Everything you need to know about FounderCrowd and how it works.
						</p>
					</div>

					{/* FAQ Items */}
					<div className="space-y-4">
						{faqData.map((faq) => (
							<div
								key={faq.id}
								className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-300"
							>
								<button
									onClick={() => toggleFAQ(faq.id)}
									className="hover:cursor-pointer w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 group"
								>
									<h3 className="text-lg font-medium text-gray-900 pr-4 group-hover:text-orange-500 transition-colors duration-300">
										{faq.question}
									</h3>
									<div className="flex-shrink-0">
										<div
											className={`
                      w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300
                      ${openFAQ === faq.id ? 'rotate-45 bg-orange-500' : 'rotate-0 group-hover:bg-gray-200'}
                    `}
										>
											<svg
												className={`w-4 h-4 transition-colors duration-300 ${
													openFAQ === faq.id
														? 'text-white'
														: 'text-gray-600'
												}`}
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												strokeWidth="2"
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
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
								>
									<div className="px-6 pb-6">
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Bottom CTA */}
					<div className="text-center mt-20">
						<p className="text-gray-600 mb-6">
							Still have questions? We're here to help.
						</p>
						<button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
							Contact Support
						</button>
					</div>
				</div>
			</section>
		);
};

export default FAQ;