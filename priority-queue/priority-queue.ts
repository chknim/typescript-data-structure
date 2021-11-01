export interface IPriorityQueue<T> {
  insert(item: T, priority: number): void
  peek(): T
  pop(): T
  size(): number
  isEmpty(): boolean
}

type pQueueMode = 'fast-insert' | 'fast-pop';
const priorityQueue = <T>(mode: pQueueMode = 'fast-insert'): IPriorityQueue<T> => {
  const pQueue: [number, T][] = [];

  return {
    insert: (item: T, priority: number): void => {
      if (mode === 'fast-insert') {
        pQueue.push([priority, item]);
      } else {
        if (pQueue.length === 0 || priority > pQueue[pQueue.length - 1][0]) {
          pQueue.push([priority, item]);
        } else {
          // O(n)
          for (let i = 0; i < pQueue.length; i++) {
            if (priority < pQueue[i][0]) {
              pQueue.splice(i, 0, [priority, item]);
              return;
            }
          }
        }
      }
    },
    isEmpty: (): boolean => pQueue.length === 0,
    peek: (): T => {
      if (pQueue.length === 0) {
        return null;
      }
      if (mode === 'fast-insert') {
        // O(n)
        return pQueue.reduce((min, current) => {
          if (!min) return current;
          return current[0] < min[0]
            ? current : min;
        })[1];
      } else {
        return pQueue[0][1];
      }
    },
    pop: (): T => {
      if (pQueue.length === 0) return null;
      if (mode === 'fast-insert') {
        // O(n)
        // Pop the one with minimum priority
        let min = pQueue[0];
        let minIdx = -1;
        pQueue.forEach((item, idx) => {
          if (item[0] < min[0]) {
            min = item;
            minIdx = idx;
          }
        });
        pQueue.splice(minIdx, 1);
        return min[1];
      } else {
        pQueue.pop()[1];
      }
    },
    size: (): number => pQueue.length
  };
}