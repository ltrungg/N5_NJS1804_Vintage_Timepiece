import React, { useState } from "react";
import { Button } from "antd";
import ProductEdit from "../components/profile/ProductForm";
// import React, { useState } from "react";
// import { Button } from "antd";
// import ProductEdit from "./ProductEdit";

const TestProductEdit = () => {
  const [open, setOpen] = useState(false);

  const product = {
    name: "Tissot PR 100 Sport Watch",
    brand: "Tissot",
    description:
      "Upgrade your accessory collection with the Tissot PR 100 Sport Watch - a timeless piece that combines style and sophistication. Crafted with a stainless steel case and strap, this watch captures the essence of modern functionality, while the 42mm round-shaped case adds a contemporary touch. Powered by a quartz movement, the Tissot Watch ensures accurate timekeeping, while the analogue dial, protected beneath scratch-resistant sapphire crystal, creates a sense of sophistication. The butterfly clasp with push buttons provides a secure fit, allowing you to wear it with confidence.",
    image: "https://www.watchshop.com/images/products/86913804_l.jpg",
    price: "324.00",
    type: "Quartz",
    dialColor: "Silver",
    box: true,
    papers: true,
    waterResistance: "100",
    caseMaterial: "Steel",
    caseSize: "42",
    status: "AVAILABLE",
  };

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit Product
      </Button>
      <ProductEdit open={open} setOpen={setOpen} product={product} />
    </div>
  );
};

export default TestProductEdit;
