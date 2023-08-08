export default function Homepage(){
  return (
    <>
        <div className="hero">
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">Open a savings account with Argent Bank today!</p>
            </section>
        </div>
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <div className="feature-item">
                <i alt="Chat Icon" className="fa-solid fa-comment-dots feature-icon"></i>
                <h3 className="feature-item-title">You are our #1 priority</h3>
                <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.</p>
            </div>
            <div className="feature-item">
                <i alt="Money Icon" className="fa-solid fa-money-bills feature-icon"></i>
                <h3 className="feature-item-title">More savings means higher rates</h3>
                <p>The more you save with us, the higher your interest rate will be!</p>
            </div>
            <div className="feature-item">
                <i alt="Security Icon" className="fa-solid fa-shield-halved feature-icon"></i>
                <h3 className="feature-item-title">Security you can trust</h3>
                <p> We use top of the line encryption to make sure your data and money is always safe.</p>
            </div>
        </section>
    </>
  );
}