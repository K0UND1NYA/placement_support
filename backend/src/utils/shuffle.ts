/**
 * Fisher-Yates shuffle seeded with a string.
 * This ensures the same seed always produces the same permutation.
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
    if (!array || array.length === 0) return [];

    // Create a deterministic number from the string seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // A simple LCG (Linear Congruential Generator) for deterministic randomness
    // Parameters from Park-Miller PCA
    let seedNum = (hash === 0) ? 1 : Math.abs(hash);
    const random = () => {
        seedNum = (seedNum * 16807) % 2147483647;
        return (seedNum - 1) / 2147483646;
    };

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
