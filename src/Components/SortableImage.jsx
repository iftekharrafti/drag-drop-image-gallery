import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./sortableImage.css";

const SortableImage = ({ image, isSelected, onImageSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleCheckboxChange = () => {
    onImageSelect(image?.id);
  };

  return (
    <>
      <div className={`image ${isSelected ? "checked" : ""}`}>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          key={image.id}
        >
          <img src={image?.image} alt="image" />
          <div className="overlay"></div>
        </div>

        <input
          type="checkbox"
          className="checkbox"
          checked={isSelected}
          value={isSelected}
          onChange={handleCheckboxChange}
        />
      </div>
    </>
  );
};

SortableImage.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};

export default SortableImage;
