import Header from '../../components/nav/Header';
import Footer from '../../components/nav/Footer';

export default function Excercises() {
    return (
        <section className='max-h-screen'>
            <Header />
            <div className="min-h-screen bg-gray-100">
                <h1>Excercises</h1>
                <p>Here you can find various exercises to practice your skills.</p>
                {/* Add your exercise components or links here */}
            </div>
            <Footer />
        </section>
    );
}