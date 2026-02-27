export function removeGapCharacters(sequence: string): string {
  return sequence.replace(/[\.-]/g, '');
}
