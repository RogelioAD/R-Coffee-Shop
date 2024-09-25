function About() {
    return (
        <div className='m-5' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 3, marginRight: '10px' }}>
                <img style={{ width: "100%" }} src={'https://www.luxcafeclub.com/cdn/shop/articles/Minimalist_Modern_Coffee_Shop_1_1100x.png?v=1713243107'} alt="Rogelios Coffee Shop" />
            </div>
            <div className='p-2' style={{ flex: 1 }}>
                <h3>Welcome to Rogelio's Coffee Shop</h3>
                <p>Welcome to Java Haven, your cozy neighborhood coffee shop where every cup tells a story.
                    Nestled in the heart of Turlock, California, Java Haven is more than just a place to grab your morning brew—it’s a community hub where friends meet,
                    ideas flourish, and relaxation is brewed fresh daily. Whether you’re looking to kickstart your day with a robust espresso, unwind with a soothing herbal
                    tea, or indulge in a decadent dessert, Java Haven offers a warm and inviting atmosphere that feels just like home. Come in, take a seat, and let us
                    make your day a little brighter, one sip at a time. ☕✨</p>
            </div>
        </div>
    )
}
export default About