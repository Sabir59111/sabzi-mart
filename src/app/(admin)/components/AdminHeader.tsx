import React from 'react'

export default function AdminHeader() {
    return (
        <header className="flex justify-between items-center bg-gray-800 text-white p-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/addProduct" className="hover:underline">Add Product</a></li>
              <li><a href="/allProducts" className="hover:underline">Products</a></li>
              <li><a href="/orders" className="hover:underline">Orders</a></li>
              <li><a href="/deals" className="hover:underline">Deals</a></li>
              <li><a href="/addDeals" className="hover:underline">Add Deals</a></li>
            </ul>
          </nav>
        </header>
      );
}
