export const UniqueKeyIngredient = () => {
    const rndSeed = Math.random();
    const rnd = Math.floor(rndSeed * 1000);
    return Number(rnd);
};