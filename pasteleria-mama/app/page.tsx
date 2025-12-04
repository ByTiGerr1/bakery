import ProductCard from "@/components/product-card";
import productsData from "@/data/products.json";
import { Product } from "@/lib/types";

export default function Home() {
  const products: Product[] = productsData;

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Dulces Momentos, Sabor Casero
        </h1>
        <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
          Explora nuestra selección de tortas, tartas y postres hechos con amor y los mejores ingredientes.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
