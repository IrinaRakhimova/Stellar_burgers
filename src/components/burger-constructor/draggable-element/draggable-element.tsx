import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggable-element.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { reorderIngredients } from "../../../slices/burgerConstructorSlice";
import { deleteIngredient } from "../../../slices/burgerConstructorSlice";
import type { Identifier } from "dnd-core";

type TDraggableElement = {
  ingredient: Ingredient;
  index: number;
};

type DragObject = {
  instanceId: string;
  index: number;
};

type DragCollectedProps = { isDragging: boolean };

type DropCollectedProps = {
  handlerId: Identifier | null;
};

export const DraggableElement: React.FC<TDraggableElement> = React.memo(
  ({ ingredient, index }) => {
    const dispatch =  useAppDispatch();
    const ref = useRef<HTMLLIElement | null>(null);
    const lastMovedRef = useRef<number | null>(null);

    const moveRow = (dragIndex: number, hoverIndex: number) => {
      if (dragIndex !== hoverIndex) {
        dispatch(
          reorderIngredients({ fromIndex: dragIndex, toIndex: hoverIndex })
        );
      }
    };

    const [{ isDragging }, dragRef] = useDrag<
      DragObject,
      unknown,
      DragCollectedProps
    >({
      type: "ingredient",
      item: { instanceId: ingredient.instanceId, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, dropRef] = useDrop<DragObject, unknown, DropCollectedProps>({
      accept: "ingredient",
      hover: (item, monitor) => {
        if (!ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        const now = Date.now();
        if (lastMovedRef.current && now - lastMovedRef.current < 100) return;
        lastMovedRef.current = now;

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const onDelete = (id: string) => {
      dispatch(deleteIngredient(id));
    };

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
  }
);
