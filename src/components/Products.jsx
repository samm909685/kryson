const products = [
  {
    name: "MOXIKALP CV 625",
    category: "Tablet",
    composition: "Amoxycillin 500mg + Clavulanic Acid 125mg",
    color: "text-blue-900",
  },
  {
    name: "MOXIKALP CV",
    extra: "Suspension",
    category: "Oral Suspension",
    composition: "Amoxycillin 200mg + Clavulanic Acid 28.5mg",
    color: "text-blue-900",
    extraColor: "text-red-700",
    extraStyle: "normal",
  },
  {
    name: "MOXIKALP",
    extra: "Forte",
    category: "Tablet",
    composition: "Amoxycillin 400mg + Clavulanic Acid 57mg",
    color: "text-blue-900",
    extraColor: "text-red-700",
    extraStyle: "italic",
  },
  {
    name: "MOXIKALP CV 375",
    category: "Tablet",
    composition: "Amoxycillin 250mg + Clavulanic Acid 125mg",
    color: "text-blue-900",
  },
  {
    name: "TREMONCET",
    category: "Tablet",
    composition: "Levocetirizine 5mg + Montelukast 10mg",
    color: "text-lime-700",
  },
  {
    name: "TREMONCET",
    extra: "Syrup",
    category: "Syrup",
    composition: "Levocetirizine + Montelukast Sodium",
    color: "text-lime-700",
    extraColor: "text-red-700",
  },
  {
    name: "SIDI SR",
    category: "Capsule",
    composition: "Rabeprazole (20mg) + Domperidone (30mg)",
    color: "text-purple-700",
  },
  {
    name: "SIDI 20",
    category: "Tablet",
    composition: "Rabeprazole 20mg",
    color: "text-purple-700",
  },
  {
    name: "STILLER SP",
    category: "Tablet",
    composition: "Aceclofenac + Paracetamol + Serratiopeptidase",
    color: "text-purple-800",
  },
  {
    name: "STILLER",
    category: "Tablet",
    composition: "Aceclofenac + Paracetamol",
    color: "text-purple-800",
  },
  {
    name: "Omix-oz",
    category: "Tablet",
    composition: "Ofloxacin 200mg + Ornidazole 500mg",
    color: "text-red-600",
  },
];

function Products() {
  return (
    <section
      id="products"
      className="py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-blue-50"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-blue-900 mb-12 md:mb-16">
          Our Products
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3
                className={`${product.color} leading-tight break-words`}
                style={{
                  fontFamily:
                    product.name.includes("MOXIKALP")
                      ? "Archivo Black"
                      : product.name.includes("TREMONCET")
                      ? "Alfa Slab One"
                      : product.name.includes("SIDI")
                      ? "Bebas Neue"
                      : product.name.includes("STILLER")
                      ? "Anton"
                      : "Playfair Display",

                  fontSize:
                    product.name.includes("SIDI")
                      ? "32px"
                      : product.name.includes("STILLER")
                      ? "24px"
                      : product.name === "Omix-oz"
                      ? "24px"
                      : "22px",

                  fontWeight:
                    product.name.includes("SIDI") ? "400" : "900",

                  letterSpacing:
                    product.name.includes("SIDI") ? "2px" : "0px",

                  textTransform:
                    product.name === "Omix-oz" ? "none" : "uppercase",

                  lineHeight: "1",
                }}
              >
                {product.name}

                {product.extra && (
                  <span
                    className={`${product.extraColor} block mt-2`}
                    style={{
                      fontSize: "16px",
                      fontFamily: "Playfair Display",
                      fontStyle:
                        product.extraStyle === "italic"
                          ? "italic"
                          : "normal",
                      fontWeight: "700",
                    }}
                  >
                    {product.extra}
                  </span>
                )}
              </h3>

              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mt-2 mb-2">
                {product.category}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                {product.composition}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;