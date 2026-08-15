import Image from "next/image";
import "./AuthorBox.css";

export default function AuthorBox() {
  return (
    <section className="author-box">

      <Image
        src="/images/author.png"
        alt="Jayanta Singha"
        width={120}
        height={120}
        className="author-image"
      />

      <div className="author-content">

        <h3>Jayanta Singha</h3>

        <span>Founder • TechPilot</span>

        <p>
          Technology enthusiast passionate about Artificial Intelligence,
          Gaming PCs, Smartphones and Software Tutorials.
          TechPilot was created to provide honest technology reviews
          and practical buying guides.
        </p>

      </div>

    </section>
  );
}