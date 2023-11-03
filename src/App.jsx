import { useState } from "react";
import img1 from "./assets/images/image-1.webp";
import img2 from "./assets/images/image-2.webp";
import img3 from "./assets/images/image-3.webp";
import img4 from "./assets/images/image-4.webp";
import img5 from "./assets/images/image-5.webp";
import img6 from "./assets/images/image-6.webp";
import img7 from "./assets/images/image-7.webp";
import img8 from "./assets/images/image-8.webp";
import img9 from "./assets/images/image-9.webp";
import img10 from "./assets/images/image-10.jpeg";
import img11 from "./assets/images/image-11.jpeg";
import "./App.css";
import { BiCheckboxChecked } from 'react-icons/bi';

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableImage from "./Components/SortableImage";

const images = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    image: img2,
  },
  {
    id: 3,
    image: img3,
  },
  {
    id: 4,
    image: img4,
  },
  {
    id: 5,
    image: img5,
  },
  {
    id: 6,
    image: img6,
  },
  {
    id: 7,
    image: img7,
  },
  {
    id: 8,
    image: img8,
  },
  {
    id: 9,
    image: img9,
  },
  {
    id: 10,
    image: img10,
  },
  {
    id: 11,
    image: img11,
  },
];

function App() {
  const [newImages, setNewImages] = useState(images);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);

  const handleImageSelection = (imageId) => {
    if (selectedItems.includes(imageId)) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== imageId)
      );
    } else {
      setSelectedItems((prevSelected) => [...prevSelected, imageId]);
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event || {};
    if (!active || !over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setNewImages((newImages) => {
      const oldIndex = newImages.findIndex((image) => image.id === active.id);
      const newIndex = newImages.findIndex((image) => image.id === over.id);
      return arrayMove(newImages, oldIndex, newIndex);
    });
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = newImages.filter(
      (image) => !selectedItems.includes(image.id)
    );

    setNewImages(updatedImages);

    setSelectedItems([]);
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="content">
            <div className="header">
            {selectedItems.length ? <h4><BiCheckboxChecked className="checked" />{selectedItems.length} Files Selected</h4> : <h4>Gallery</h4>}
              
              {selectedItems.length ? (
                <p
                  className="deleteButton"
                  onClick={handleDeleteSelectedImages}
                >
                  Delete files
                </p>
              ) : (
                ""
              )}
            </div>
            <hr className="hr" />

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={newImages}
                strategy={verticalListSortingStrategy}
              >
                <div className="images">
                  {newImages.map((image, index) => (
                    <SortableImage
                      key={image.id}
                      className={index === 0 ? "first" : ""}
                      image={image}
                      isSelected={selectedItems.includes(image.id)}
                      onImageSelect={handleImageSelection}
                    />
                  ))}
                  <button className="image-button">
                    <img src="./img.png" alt="" />
                    Add Images
                  </button>
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
