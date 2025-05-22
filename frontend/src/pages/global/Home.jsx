import Hero from '../global/components/Hero';
import Data from '../global/components/data';
import Header from '../../components/nav/Header'
import Footer from '../../components/nav/Footer';

export default function Home() {
    return (
        <div>
            <Header />
            {/* Hero Section */}
            <Hero />
            <Data />
            <Footer />
        </div>
    );
}