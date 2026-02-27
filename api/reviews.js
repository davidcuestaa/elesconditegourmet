export default async function handler(req, res) {
  try {
    const placeId = "ChIJo4jZfvxJYA0Rp0Gs3k1swMs";

    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&key=${process.env.GOOGLE_API_KEY}`
    );

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=86400"); // cache 24h
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo reseñas" });
  }
}
