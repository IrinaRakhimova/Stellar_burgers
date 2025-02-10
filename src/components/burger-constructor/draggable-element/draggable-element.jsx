import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './draggable-element.module.css';
import { useDispatch } from 'react-redux';
import { reorderIngredients } from '../../../services/slices/burgerConstructorSlice'; 

export const DraggableElement = React.memo(({ ingredient, index, onDelete }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const lastMovedRef = useRef(null);

  const moveRow = (dragIndex, hoverIndex) => {
    if (dragIndex !== hoverIndex) {
      dispatch(reorderIngredients({ fromIndex: dragIndex, toIndex: hoverIndex })); 
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { instanceId: ingredient.instanceId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const now = Date.now();
      if (lastMovedRef.current && now - lastMovedRef.current < 100) return;
      lastMovedRef.current = now;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <li
      ref={(node) => {
        ref.current = node;
        dragRef(dropRef(node));
      }}
      className={styles.constructorElement}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      aria-label={`Draggable ingredient: ${ingredient.name}`}
      role="listitem"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price || 0}
        handleClose={() => onDelete(ingredient.instanceId)}
      />
    </li>
  );
});

DraggableElement.propTypes = {
  ingredient: PropTypes.shape({
    instanceId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};