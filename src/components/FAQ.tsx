"use client";
import React, { useState } from 'react';

const faqData = [
	{
		id: 1,
		question: 'What is FoundersCrowd?',
		answer:
			'FoundersCrowd is the all-in-one platform where startups can raise capital online from anywhere in the world. We combine AI-powered investor funnels, global marketing tools, and compliance support to help founders launch and scale successful funding campaigns.',
	},
	{
		id: 2,
		question: 'Who can raise on FoundersCrowd?',
		answer:
			'Any founder — from early-stage startups to growth companies — can raise capital on FoundersCrowd. We support multiple raise types, including Regulation CF, Regulation D, and Regulation A+.',
	},
	{
		id: 3,
		question: 'How is FoundersCrowd different from other platforms?',
		answer:
			'We convert 20% higher on average than traditional platforms, with the lowest fees in the industry. Plus, we give you AI tools to optimize your campaign and global marketing to reach investors anywhere with an internet connection.',
	},
	{
		id: 4,
		question: 'How much can I raise?',
		answer:
			'It depends on what you’re looking for. With FoundersCrowd you can raise anywhere from $50,000 to $5 million, and even beyond if your funding needs are larger. Reach out to our team and we’ll help you decide which raise type and strategy is the best fit for your goals.',
	},
	{
		id: 5,
		question: 'Who can invest?',
		answer:
			'Investors from around the world can participate, depending on the regulation type you choose. This includes everyday retail investors, accredited investors, institutions, and even your own customers and fans.',
	},
	{
		id: 6,
		question: 'How quickly can I launch my campaign?',
		answer:
			'With FoundersCrowd AI and our guided onboarding, you can go live in days, not months. We handle compliance, funnel setup, and campaign design so you can focus on your business.',
	},
	{
		id: 7,
		question: 'What does it cost to raise on FoundersCrowd?',
		answer:
			'We operate on a founder-first pricing model: low upfront costs, transparent terms, and success-based fees. We only win when you win.',
	},
	{
		id: 8,
		question: 'Is FoundersCrowd secure and compliant?',
		answer:
			'Yes. We integrate robust KYC/AML checks and work with trusted legal partners to keep your raise safe, compliant, and ready for global participation.',
	},
	{
		id: 9,
		question: 'Can investors outside my country join my raise?',
		answer:
			'Yes. As long as your chosen regulation allows it, investors worldwide can participate in your raise, giving you access to capital without borders.',
	},
	{
		id: 10,
		question: 'How do I get started?',
		answer:
			'Click Start Raising to apply. Our team will guide you through onboarding, set up your investor funnel, and launch your campaign to the world.',
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