export function getImageSrc(prodotto) {
	if (!prodotto || !prodotto.category || !prodotto.title) return [];
	const base = `/${prodotto.category}/${prodotto.title}`;
	return [
		`${base}.jpg`,
		`${base}.png`
	];
}