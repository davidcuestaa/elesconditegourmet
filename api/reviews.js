export default async function handler(req, res) {
  try {
    // Pon aquí el Place ID de tu negocio
    const placeId = "ChIJo4jZfvxJYA0Rp0Gs3k1swMs";

    // Llamada a la API clásica de Google Places
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${process.env.GOOGLE_API_KEY}`
    );

    const data = await response.json();

    if (!data.result) {
      return res.status(404).json({ error: "No se encontraron reseñas" });
    }

    // Extraemos solo los campos que nos interesan
    const reviews = (data.result.reviews || []).map(r => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.relative_time_description,
      profile_photo_url: r.profile_photo_url
    }));

    res.setHeader("Cache-Control", "s-maxage=86400"); // cache 24h
    res.status(200).json({
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo reseñas" });
  }
}
