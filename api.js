export default async function handler(req, res) {
  const key = process.env.UNSPLASH_KEY;
  const { query } = req.query;

  const r = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=4`, {
    headers: { Authorization: `Client-ID ${key}` }
  });

  const data = await r.json();
  res.status(200).json(data);
}