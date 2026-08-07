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
  // 1. Point this exactly to your target recipes or journal collection name in Atlas
  const rawRecipes = await db.collection("recipes").find({}).toArray();

  // 2. Explicitly map the properties so Next.js hands them down to JournalClient safely
  const serializedRecipes = rawRecipes.map((recipe) => ({
    _id: recipe._id.toString(),
    title: recipe.title || "Untitled Formulation",
    category: recipe.category || "Uncategorized",
    difficulty: recipe.difficulty || "Easy",
    benefit: recipe.benefit || "",
    instructions: recipe.instructions || "",
    productUrl: recipe.productUrl || "",
    
    // CRITICAL SAFETIES: Ensures array-lists filter cleanly without breaking
    ingredients: Array.isArray(recipe.ingredients) 
      ? recipe.ingredients 
      : recipe.ingredients 
        ? [recipe.ingredients] 
        : []
  }));

  return (
    <>
      <Navbar />
      <JournalClient initialRituals={serializedRecipes} />
      <Footer />
    </>
  );
}