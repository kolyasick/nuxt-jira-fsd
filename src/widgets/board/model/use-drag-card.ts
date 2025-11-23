export type Card = {
  id: number;
  text: string;
};

export const useDragCard = () => {
  const isDragging = ref(false);
  const sourceColumn = ref<string | null>();
  const dragItem = ref<Card | null>(null);

  const onDragStart = (e: DragEvent, card: Card, source: string) => {
    isDragging.value = true;
    dragItem.value = card;
    sourceColumn.value = source;
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;
    dragItem.value = null;
  };

  const onDragEnd = () => {
    isDragging.value = false;
    dragItem.value = null;
    sourceColumn.value = null;
  };

  return {
    isDragging,
    dragItem,
    sourceColumn,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
  };
};
