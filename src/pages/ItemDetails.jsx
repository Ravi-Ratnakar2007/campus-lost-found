import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import electronicsImg from "../assets/electronics.png";
import accessoriesImg from "../assets/accessories.png";
import documentsImg from "../assets/documents.png";
import keysImg from "../assets/keys.png";
import defaultImg from "../assets/default.png";

const categoryImages = {
  Electronics: electronicsImg,
  Accessories: accessoriesImg,
  Documents: documentsImg,
  Keys: keysImg
};

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!item) {
    return <h2 style={{ textAlign: "center" }}>Item not found</h2>;
  }

  const imageSrc = categoryImages[item.category] || defaultImg;

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <div className="details-image">
          <img src={imageSrc} alt={item.name} />
        </div>

        <div className="details-content">
          <h1>{item.name}</h1>

          <p>
            <strong>Status:</strong>{" "}
            <span className={item.status === "lost" ? "lost-text" : "found-text"}>
              {item.status?.toUpperCase()}
            </span>
          </p>

          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Contact:</strong> {item.contact}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;