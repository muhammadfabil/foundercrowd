import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen pt-24">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
