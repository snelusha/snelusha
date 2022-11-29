import fs from "node:fs/promises";

export class Low<T> {
  private filename: string;
  
  data: any = null;

  constructor(filename: string) {
    this.filename = filename;
  }

  async read() {
    try {
      const file = await fs.readFile(this.filename, "utf-8");
      const data = JSON.parse(file);
      this.data = data;
      return data;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      throw error;
    }
  }

  async write(obj: T): Promise<void> {
    try {
      await fs.writeFile(this.filename, JSON.stringify(obj, null, 2), "utf-8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return;
      }
      throw error;
    }
  }
}
