import { Nav, Hero } from "@/components/wedding/HeroNav";
import { About, Venue, Schedule, Gallery } from "@/components/wedding/ContentSections";
import { Contacts, RSVP, Footer } from "@/components/wedding/ContactFooter";

export default function Index() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Venue />
      <Schedule />
      <Gallery />
      <Contacts />
      <RSVP />
      <Footer />
    </div>
  );
}
