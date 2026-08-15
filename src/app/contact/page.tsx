
import "./contact.css";

export default function ContactPage() {
  return (
    <>
      

      <main className="contact-page">

        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>
            Have a question, suggestion or business enquiry?
            We'd love to hear from you.
          </p>
        </section>

        <section className="contact-container">

          <form className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="text"
              placeholder="Subject"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
            />

            <button type="submit">
              Send Message
            </button>

          </form>

        </section>

      </main>

      
    </>
  );
}