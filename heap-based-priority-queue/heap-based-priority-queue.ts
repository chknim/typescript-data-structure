import { IPriorityQueue } from '../priority-queue/priority-queue';
import { Heap, IHeap } from '../heap/heap';

const priorityQueue = <T>(): IPriorityQueue<T> => {
  // T is a class with comparable property based on its weight or priority
  let heap: IHeap<T> = Heap<T>();

  return {
    isEmpty: (): boolean => heap.isEmpty(),
    size: (): number => heap.size(),
    peek: (): T => heap.peek(),
    insert: (item: T): void => heap.insert(item),
    pop: (): T => heap.pop()
  };
}