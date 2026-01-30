
import './home.css'
import wasteImg from './assets/e waste2.jpg';

function Home() {

        return (

            <div className="front_page">
                <h1 className="page_heading"> E-WASTE MANAGEMENT</h1>
                <br></br>
                <p className="page_para">
                    <span className="first_letter">E</span>lectronic waste (e-waste) has emerged as one of the fastest-growing waste streams in the world due to rapid digitalization,
                    technological upgrades, and increased consumption of electronic devices. According to global estimates,
                    the world generates over 50 million metric tonnes of e-waste every year, and this figure is expected to rise significantly in the coming decades.
                    However, less than 20% of global e-waste is formally recycled, while the rest is dumped, landfilled,
                    or handled by informal sectors. This poses a serious global challenge as e-waste contains toxic substances such as lead,
                    mercury, and cadmium, which threaten ecosystems and human health, while also containing valuable materials like gold, copper,
                    and rare earth elements that are often lost due to improper recycling.

                    In India, the e-waste problem is growing rapidly alongside urbanization, population growth,
                    and increased use of electronic products. India is the third-largest e-waste generator in the world,
                    producing over 1.5 million metric tonnes of e-waste annually.
                    A major concern is that a large portion of this waste is processed by the informal recycling sector
                    using unsafe methods such as open burning and acid leaching, leading to severe air, water,
                    and soil pollution. The lack of awareness, insufficient collection systems, and
                    limited implementation of formal recycling infrastructure further worsen the problem.
                    Effective e-waste management in India and across the world is therefore essential to reduce environmental damage,
                    protect public health, conserve valuable resources, and move toward sustainable and circular economic practices.
                </p>
                <img src={wasteImg} alt="E-waste" className="wasteImage" />
            </div>
        )
}
export default Home;