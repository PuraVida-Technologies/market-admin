export class MockStorage implements Storage {
  private store: Map<string, string>;

  constructor() {
    this.store = new Map();
  }

  get length(): number {
    const values = Array.from(this.store.values());
    return values.length;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    if (!this.store.has(key)) {
      return null;
    }
    const value = this.store.get(key);
    if (!value) {
      return null;
    }
    return value;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  key(index: number): string | null {
    const values = Array.from(this.store.values());
    if (!values[index]) {
      return null;
    }
    return values[index];
  }

  setItem(key: string, val: string): void {
    this.store.set(key, val);
  }
}
