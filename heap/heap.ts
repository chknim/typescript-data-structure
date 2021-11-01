export interface IHeap<T> {
  get(): T,
  isEmpty(): boolean,
  size(): number,
  peek(): T,
  insert(T): void,
  pop(): T
}

export const Heap = <T>(): IHeap<T> => {
  const heap: T[] = [];

  const getParentIdx = (idx: number): number => {
    if (idx === 0) return -1;
    return Math.floor((idx - 1) / 2);
  }

  const getChildIdx = (idx: number, which: string = 'left'): number => {
    if (which === 'left') return idx*2 + 1;
    return idx*2 + 2;
  }

  const getChild = (idx: number, which: string = 'left'): T => {
    const childIdx = getChildIdx(idx, which);
    if (childIdx < heap.length) {
      return heap[childIdx];
    }
    return null;
  }

  return {
    get: (): T => heap[0],
    isEmpty: (): boolean => heap.length > 0,
    size: (): number => heap.length,
    peek: (): T => heap[0] ? heap[0] : null,
    insert: (node: T): void => {
      heap.push(node);
      if (heap.length > 1) {
        let currentIdx = heap.length - 1;
        let parentIdx = getParentIdx(currentIdx);
        while (currentIdx > 1 &&
          heap[currentIdx] < heap[parentIdx]) {
          [heap[currentIdx], heap[parentIdx]] = [heap[parentIdx], heap[currentIdx]];
          currentIdx = parentIdx;
        }
      }
    },
    pop: (): T => {
      const result = heap[0];
      // move last to first and being re-sort
      heap[0] = heap.pop();
      let currentIdx = 0;
      while (currentIdx < heap.length - 1) {
        const current = heap[currentIdx];
        const leftChild = getChild(currentIdx);
        const rightChild = getChild(currentIdx, 'right');
        if ((current <= leftChild || leftChild === null) &&
          (current <= rightChild || rightChild === null)) {
          break;
        } else if (leftChild !== null && current > leftChild) {
          const leftChildIdx = getChildIdx(currentIdx);
          [heap[currentIdx], heap[leftChildIdx]] = [heap[leftChildIdx], heap[currentIdx]];
          currentIdx = leftChildIdx;
        } else {
          const rightChildIdx = getChildIdx(currentIdx, 'right');
          [heap[currentIdx], heap[rightChildIdx]] = [heap[rightChildIdx], heap[currentIdx]];
          currentIdx = rightChildIdx;
        }
      }
      return result;
    }
  };
}
