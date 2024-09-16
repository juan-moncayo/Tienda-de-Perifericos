"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [notification, setNotification] = useState<string | null>(null);
  const [cart, setCart] = useState<Map<string, { name: string; image: string; quantity: number }>>(new Map());

  const products = [
    {
      name: 'Teclado Mecánico RGB',
      description: 'Teclado con retroiluminación RGB personalizable y switches mecánicos para una respuesta precisa.',
      stock: 20,
      image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/06/hp-omen-sequencer-teclado-mecanico-gaming-rgb.png', 
    },
    {
      name: 'Ratón Gamer',
      description: 'Ratón ergonómico con ajuste de DPI y botones programables para una experiencia de juego personalizada.',
      stock: 15,
      image: 'https://www.quorumsystem.com.co/wp-content/uploads/2021/11/71O23Hqq3jL._AC_SL1500_.jpg',
    },
    {
      name: 'Auriculares con Micrófono',
      description: 'Auriculares con sonido envolvente y micrófono ajustable para comunicación clara en juegos y videollamadas.',
      stock: 10,
      image: 'https://s.libertaddigital.com/2021/10/23/auriculares-con-microfono-logitech-g432.jpg', 
    },
    {
      name: 'Monitor 24" Full HD',
      description: 'Monitor de 24 pulgadas con resolución Full HD y soporte ajustable para una visualización cómoda.',
      stock: 8,
      image: 'https://http2.mlstatic.com/D_NQ_NP_807703-CBT70750129108_072023-O.webp', 
    },
  ];

  const handleAddToCart = (product: { name: string; image: string }) => {
    setNotification(`${product.name} añadido al carrito`);
    setTimeout(() => setNotification(null), 3000);

    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const existingProduct = newCart.get(product.name);

      if (existingProduct) {
        newCart.set(product.name, { ...existingProduct, quantity: existingProduct.quantity + 1 });
      } else {
        newCart.set(product.name, { name: product.name, image: product.image, quantity: 1 });
      }

      return newCart;
    });
  };

  const handleRemoveFromCart = (productName: string) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const existingProduct = newCart.get(productName);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          newCart.set(productName, { ...existingProduct, quantity: existingProduct.quantity - 1 });
        } else {
          newCart.delete(productName);
        }
      }

      return newCart;
    });
  };

  const handleIncreaseQuantity = (productName: string) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const existingProduct = newCart.get(productName);

      if (existingProduct) {
        newCart.set(productName, { ...existingProduct, quantity: existingProduct.quantity + 1 });
      }

      return newCart;
    });
  };

  return (
    <main className="grid min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <section className="mb-8 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-left">PeriStore</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base text-left">
          Explora nuestra selección de periféricos para mejorar tu experiencia informática de la ciudad de pasto.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 md:p-8 flex flex-col items-start">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={200} 
              className="mb-4 rounded-lg" 
              style={{ objectFit: 'cover' }} 
              unoptimized 
            />
            <h2 className="text-lg md:text-xl font-semibold text-left">{product.name}</h2>
            <p className="text-gray-500 text-sm md:text-base text-left">{product.description}</p>
            <p className={`mt-2 ${product.stock === 0 ? 'text-red-500' : 'text-green-500'}`}>
              {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={product.stock === 0}
            >
              Añadir al carrito
            </button>
          </div>
        ))}

        {notification && (
          <div 
            role="alert" 
            aria-live="polite" 
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform transform translate-y-4"
          >
            {notification}
          </div>
        )}
      </div>

      {/*funciondel carrito de compras*/}
      <div className="fixed bottom-0 right-0 p-4">
        <button
          onClick={() => document.getElementById('cart')?.classList.toggle('hidden')}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Ver Carrito ({[...cart.values()].reduce((acc, item) => acc + item.quantity, 0)})
        </button>
        <div id="cart" className="hidden fixed bottom-16 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold mb-2">Carrito de Compras</h2>
          {cart.size > 0 ? (
            [...cart.values()].map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="mr-2 rounded-lg" unoptimized />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleRemoveFromCart(item.name)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.name)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>El carrito está vacío.</p>
          )}
        </div>
      </div>
    </main>
  );
}
