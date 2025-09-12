import React, { memo } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Extract constants for better performance
const teamMembers = [
    {
        id: 1,
        name: 'Jose Ruiz',
        position: 'CEO & Founder',
        photo: '/team1.jpg',
    },
    {
        id: 2,
        name: 'Alberto Rosado',
        position: 'Head of M&A',
        photo: '/team2.jpg',
    },
    {
        id: 3,
        name: 'Will Kennedy',
        position: 'CFO',
        photo: '/team3.jpg',
    },
    {
        id: 4,
        name: 'Muhammad Ali',
        position: 'Head of Marketing',
        photo: '/team4.jpg',
    },
    {
        id: 5,
        name: 'Usama Amin',
        position: 'Growth Marketing',
        photo: '/team5.jpg',
    },
    {
        id: 6,
        name: 'Risha Ahmed',
        position: 'Head of Content',
        photo: '/team6.jpg',
    },
    {
        id: 7,
        name: 'Sithira Surendra',
        position: 'Creative Director',
        photo: '/team7.jpg',
    },
    {
        id: 8,
        name: 'Manuel Sanchez',
        position: 'Analyst',
        photo: '/team8.png',
    },
    {
        id: 9,
        name: 'Sugee Geethma',
        position: 'Analyst',
        photo: '/team9.jpg',
    },
];

const TeamPage = memo(() => {
    return (
        <>
            {/* ✅ FIXED: Hero section dengan responsive padding yang konsisten */}
            <div className="bg-[#2B2B2B] relative">
                <Navbar />
                <div className="pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-32 md:pb-12 px-4 max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        Meet Our Team
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        The talented individuals behind FounderCrowd who are passionate about
                        helping founders succeed.
                    </p>
                    
                    {/* ✅ ADDED: Video section seperti di Hero.tsx */}
                    <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 relative mx-auto max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
                        <div className="aspect-[16/9] overflow-hidden rounded-lg md:rounded-xl shadow-lg border border-gray-100">
                            <iframe 
                                src="https://player.vimeo.com/video/1115691817?h=0&autoplay=1&loop=1&muted=1"
                                className="h-full w-full"
                                frameBorder="0" 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowFullScreen
                                title="Team introduction video"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={member.photo}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                        className="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                                        priority={member.id <= 6}
                                    />
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                                        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-xl font-semibold mb-1 drop-shadow-lg">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-200 drop-shadow-md">
                                                {member.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Info section */}
                                <div className="p-6 text-center bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm font-medium">
                                        {member.position}
                                    </p>
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

TeamPage.displayName = 'TeamPage';

export default TeamPage;