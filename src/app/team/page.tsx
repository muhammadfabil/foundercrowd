import React, { memo } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Extract constants for better performance
const teamMembers = [
	{
		id: 1,
		name: 'John Doe',
		position: 'CEO & Founder',
		photo: '/founders.jpg',
	},
	{
		id: 2,
		name: 'Jane Smith',
		position: 'CTO',
		photo: '/founders.jpg',
	},
	{
		id: 3,
		name: 'Mike Johnson',
		position: 'Head of Marketing',
		photo: '/founders.jpg',
	},
	{
		id: 4,
		name: 'Sarah Wilson',
		position: 'Lead Developer',
		photo: '/founders.jpg',
	},
	{
		id: 5,
		name: 'David Brown',
		position: 'Product Manager',
		photo: '/founders.jpg',
	},
	{
		id: 6,
		name: 'Emily Davis',
		position: 'UX Designer',
		photo: '/founders.jpg',
	},
	{
		id: 7,
		name: 'Chris Taylor',
		position: 'Data Analyst',
		photo: '/founders.jpg',
	},
	{
		id: 8,
		name: 'Lisa Anderson',
		position: 'Operations Manager',
		photo: '/founders.jpg',
	},
	{
		id: 9,
		name: 'Tom Martinez',
		position: 'Sales Director',
		photo: '/founders.jpg',
	},
];

const TeamPage = memo(() => {
	return (
		<>
			<div className="bg-[#2B2B2B] min-h-[50vh] relative">
				<Navbar />
				{/* Hero section with dark background to make navbar visible */}
				<div className="pt-32 pb-16 px-4 max-w-7xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-medium text-white mb-2 mt-12">
						Meet Our Team
					</h1>
					<p className="text-gray-300 text-lg max-w-2xl mx-auto">
						The talented individuals behind FounderCrowd who are passionate about
						helping founders succeed.
					</p>
				</div>
			</div>

			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4">
					{/* Team Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{teamMembers.map((member) => (
							<div
								key={member.id}
								className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
							>
								<div className="relative h-80">
									<Image
										src={member.photo}
										alt={member.name}
										fill
										className="object-cover"
									/>
									{/* Hover Overlay */}
									<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
										<div className="text-center text-white">
											<h3 className="text-xl font-semibold mb-2">
												{member.name}
											</h3>
											<p className="text-sm">{member.position}</p>
										</div>
									</div>
								</div>
								{/* Display name and position outside of overlay for better visibility */}
								<div className="p-4 text-center">
									<h3 className="text-lg font-semibold">{member.name}</h3>
									<p className="text-gray-600">{member.position}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
});

export default TeamPage;