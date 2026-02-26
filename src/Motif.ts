export class Motif {
  readonly #motif;

  constructor(motif: string) {
    this.#motif = motif;
  }

  toString(): string {
    return this.#motif;
  }
}
