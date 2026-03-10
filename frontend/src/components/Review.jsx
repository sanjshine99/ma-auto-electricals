import React from "react";

const reviews = [
  {
    text: `"Oishi never disappoints. The variety on the menu is impressive, and everything I've tried has been delicious. The staff is friendly and attentive, making every visit enjoyable. The spicy tuna roll is a must-try!"`,
    img: "https://framerusercontent.com/images/Y9KmJAQ4w53hsc4jJojfokLZ7D8.jpg",
    name: "Michael T.",
  },
  {
    text: `"I've been to many sushi restaurants, but Oishi stands out for its quality and creativity. The Omakase experience was unforgettable. Each piece of sushi was a delight, and the chef's explanations added a special touch."`,
    img: "https://framerusercontent.com/images/aNEfzolOrmcZPNccFbRZfTzZxwY.jpg",
    name: "Emily R.",
  },
  {
    text: `"The ambiance at Oishi is fantastic. It's cozy, modern, and the perfect place for a date night or a casual dinner with friends. The dragon roll is my absolute favorite. Service is always top-notch."`,
    img: "https://framerusercontent.com/images/adA3ca5MJSdYVtT9ZmtqJigs.jpg",
    name: "Jane A.",
  },
  {
    text: `"Oishi has the best sushi in town! The fish is always incredibly fresh, and the presentation is stunning. The chefs are true artists. I can't get enough of their sashimi platter. Highly recommend!"`,
    img: "https://framerusercontent.com/images/A9RPsEO3tCGkBToytnctlJsNek.jpg",
    name: "Mark S.",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-24 bg-black text-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-sm tracking-[0.3em] text-gray-400">REVIEWS</h2>
        <h3 className="text-3xl md:text-4xl font-semibold mt-3">
          OUR CUSTOMERS LOVE US
        </h3>
      </div>

      {/* Review Grid (2x2 layout like image) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 border border-gray-700">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-10 border-b border-gray-700 md:border-r last:border-r-0
                       md:[&:nth-child(2)]:border-r-0 md:[&:nth-child(4)]:border-r-0
                       flex flex-col gap-6"
          >
            <p className="text-gray-300 leading-relaxed">{review.text}</p>

            <div className="flex items-center gap-3">
              <img
                src={review.img}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
              />
              <p className="text-gray-200 text-sm">{review.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Read More */}
      <div className="text-center mt-16">
        <button className="text-gray-300 text-sm tracking-wide hover:text-white transition">
          READ MORE REVIEWS
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;
