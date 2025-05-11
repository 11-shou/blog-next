export async function GET() {
  try {
    const response = await fetch('https://v1.hitokoto.cn/?c=f', {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return Response.json({
      hitokoto: '生活不止眼前的苟且，还有诗和远方的田野。',
      creator: '高晓松',
    });
  }
} 