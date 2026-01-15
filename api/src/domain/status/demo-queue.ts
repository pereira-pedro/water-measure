export interface DemoQueue {
  enqueueHello(name: string): Promise<{ id: string | number | null }>;
}
