import clientPromise from '@/lib/mongodb';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FAQClient from './FAQClient'; // We will create this next

export const dynamic = 'force-dynamic';
// 1. Define what an FAQ looks like for TypeScript
export interface FAQContent {
  type: 'text' | 'headline' | 'bullets';
  value: string | string[];
}

export interface FAQItem {
  _id: string;
  question: string;
  answerContent: FAQContent[];
}

// 2. The SERVER WRAPPER (This stays on the server)
export default async function FAQPage() {
  const client = await clientPromise;
  const db = client.db("shop");
  const data = await db.collection("faqs").find({}).toArray();
  
  // Convert MongoDB IDs to strings to safely pass to the Client
  const serializedFaqs: FAQItem[] = data.map(faq => ({
    ...faq,
    _id: faq._id.toString(),
    // Ensure TypeScript knows these match our interface
    question: faq.question,
    answerContent: faq.answerContent
  }));

  return (
    <>
      <Navbar />
      <FAQClient initialFaqs={serializedFaqs} />
      <Footer />
    </>
  );
}