// Mock data for development (when database is not connected)
export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  product?: Product
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone?: string
  shipping_address: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  created_at: string
  updated_at?: string
  items?: OrderItem[]
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
    price: 299.99,
    image_url: "/premium-wireless-headphones.png",
    category: "Electronics",
    stock: 50,
    featured: true,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications",
    price: 399.99,
    image_url: "/smart-watch-fitness.png",
    category: "Electronics",
    stock: 35,
    featured: true,
  },
  {
    id: 3,
    name: "Leather Messenger Bag",
    description: "Handcrafted genuine leather messenger bag with laptop compartment",
    price: 189.99,
    image_url: "/leather-messenger-bag.png",
    category: "Accessories",
    stock: 25,
    featured: false,
  },
  {
    id: 4,
    name: "Minimalist Wallet",
    description: "Slim RFID-blocking wallet with space for 8 cards and cash",
    price: 49.99,
    image_url: "/minimalist-wallet.jpg",
    category: "Accessories",
    stock: 100,
    featured: true,
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360-degree sound and 12-hour battery",
    price: 129.99,
    image_url: "/bluetooth-speaker.jpg",
    category: "Electronics",
    stock: 60,
    featured: false,
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description: "Insulated bottle keeps drinks cold for 24 hours or hot for 12 hours",
    price: 34.99,
    image_url: "/steel-water-bottle.jpg",
    category: "Lifestyle",
    stock: 150,
    featured: false,
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    description: "Extra thick non-slip yoga mat with carrying strap",
    price: 59.99,
    image_url: "/rolled-yoga-mat.png",
    category: "Lifestyle",
    stock: 80,
    featured: false,
  },
  {
    id: 8,
    name: "Desk Organizer Set",
    description: "Bamboo desk organizer with multiple compartments",
    price: 44.99,
    image_url: "/desk-organizer.png",
    category: "Office",
    stock: 45,
    featured: false,
  },
  {
    id: 9,
    name: "Ergonomic Mouse",
    description: "Vertical ergonomic mouse reduces wrist strain",
    price: 69.99,
    image_url: "/ergonomic-mouse.png",
    category: "Electronics",
    stock: 70,
    featured: true,
  },
  {
    id: 10,
    name: "Plant-Based Protein Powder",
    description: "Organic vegan protein powder with 25g protein per serving",
    price: 39.99,
    image_url: "/protein-powder.jpg",
    category: "Health",
    stock: 120,
    featured: false,
  },
  {
    id: 11,
    name: "Running Shoes",
    description: "Lightweight running shoes with responsive cushioning",
    price: 149.99,
    image_url: "/running-shoes.jpg",
    category: "Footwear",
    stock: 40,
    featured: true,
  },
  {
    id: 12,
    name: "Sunglasses Classic",
    description: "UV400 protection polarized sunglasses",
    price: 89.99,
    image_url: "/stylish-sunglasses.png",
    category: "Accessories",
    stock: 90,
    featured: false,
  },
]

export const mockOrders: Order[] = [
  {
    id: 1,
    customer_name: "John Doe",
    customer_email: "john@example.com",
    customer_phone: "+1234567890",
    shipping_address: "123 Main St, New York, NY 10001",
    total_amount: 699.98,
    status: "delivered",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    customer_name: "Jane Smith",
    customer_email: "jane@example.com",
    customer_phone: "+1234567891",
    shipping_address: "456 Oak Ave, Los Angeles, CA 90001",
    total_amount: 449.98,
    status: "shipped",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    customer_name: "Bob Johnson",
    customer_email: "bob@example.com",
    shipping_address: "789 Pine Rd, Chicago, IL 60601",
    total_amount: 189.99,
    status: "processing",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    customer_name: "Alice Williams",
    customer_email: "alice@example.com",
    customer_phone: "+1234567893",
    shipping_address: "321 Elm St, Houston, TX 77001",
    total_amount: 299.99,
    status: "pending",
    created_at: new Date().toISOString(),
  },
]
