// app/api/runs/route.ts (Next.js App Router)
export async function GET() {
  // Refresh access token
  const tokenRes = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const { access_token } = await tokenRes.json();

  // Fetch activities
  const activitiesRes = await fetch(
    'https://www.strava.com/api/v3/athlete/activities?per_page=50',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );
  const activities = await activitiesRes.json();

  // Filter to ~5K runs (Strava gives distance in meters)
  const runs = activities
    .filter((a: any) => a.type === 'Run' && a.distance >= 4800 && a.distance <= 5200)
    .map((a: any) => ({
      date: a.start_date_local.split('T')[0], // "2026-09-22"
      fiveKTime: a.moving_time / 60, // seconds → minutes
      distance: a.distance,
    }));

  return Response.json(runs);
}
