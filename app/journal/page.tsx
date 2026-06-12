import clientPromise from '@/lib/mongodb';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import JournalClient from './JournalClient';


export const dynamic = 'force-dynamic';
// 1. Define the Interface for both files to use
export interface Ritual {
  _id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  ingredients: string[];
  instructions: string;
  benefit: string;
}

export default async function JournalPage() {
  const client = await clientPromise;
  const db = client.db("shop");
  const data = await db.collection("recipes").find({}).toArray();

  // 2. Serialize for the Client
  const serializedRecipes: Ritual[] = data.map(recipe => ({
    ...recipe,
    _id: recipe._id.toString(),
    title: recipe.title,
    category: recipe.category,
    difficulty: recipe.difficulty as 'Easy' | 'Moderate' | 'Advanced',
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    benefit: recipe.benefit
  }));

  return (
    <>
      <Navbar />
      <JournalClient initialRituals={serializedRecipes} />
      <Footer />
    </>
  );
}