import educationImg from '../assets/images/education/education.jpg';
import ngoImg from '../assets/images/ngo/ngo.jpg';
import stockMarketImg from '../assets/images/stock-market/stock-market.jpg';
import businessImg from '../assets/images/business/business.jpg';
import blogImg from '../assets/images/blog/blog.jpg';

export const sliderData = [
  {
    id: 1,
    title: "Education",
    image: educationImg,
    route: "/education",
    bgTypography: "LEARN",
    description: "Empowering minds through immersive and modern education architectures.",
    // Editable backgrounds: You can use a solid color, CSS gradient, or a background image URL.
    bgImage: "", // Set an image URL or import here to show an image background behind the cards
    bgGradient: "linear-gradient(135deg, #150f2e 0%, #090615 100%)",
    accentColor: "#a855f7",
    tagline: "Inspiring the Next Generation"
  },
  {
    id: 2,
    title: "NGO",
    image: ngoImg,
    route: "/ngo",
    bgTypography: "IMPACT",
    description: "Driving global change through sustainable community-driven actions.",
    bgImage: "",
    bgGradient: "linear-gradient(135deg, #0f241d 0%, #050d0a 100%)",
    accentColor: "#10b981",
    tagline: "Empowering Communities Worldwide"
  },
  {
    id: 3,
    title: "Stock Market",
    image: stockMarketImg,
    route: "/stock-market",
    bgTypography: "ANALYZE",
    description: "Real-time visual data processing and financial market forecasting models.",
    bgImage: "",
    bgGradient: "linear-gradient(135deg, #0e1e38 0%, #050c18 100%)",
    accentColor: "#3b82f6",
    tagline: "Navigating Global Markets"
  },
  {
    id: 4,
    title: "Business",
    image: businessImg,
    route: "/business",
    bgTypography: "VENTURE",
    description: "Scalable enterprise innovations and high-performance business strategies.",
    bgImage: "",
    bgGradient: "linear-gradient(135deg, #241414 0%, #0d0707 100%)",
    accentColor: "#ef4444",
    tagline: "Accelerating Enterprise Value"
  },
  {
    id: 5,
    title: "Blog",
    image: blogImg,
    route: "/blog",
    bgTypography: "WRITE",
    description: "Sharing insights, creative theories, and technical engineering deep-dives.",
    bgImage: "",
    bgGradient: "linear-gradient(135deg, #201f18 0%, #0a0a08 100%)",
    accentColor: "#eab308",
    tagline: "Curated Thoughts & Tech Deep Dives"
  }
];
