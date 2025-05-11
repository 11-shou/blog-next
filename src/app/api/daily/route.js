export async function GET() {
  try {
    const response = await fetch('https://open.iciba.com/dsapi/', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch daily quote');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    return Response.json({
      content: '获取每日一句失败，请稍后再试。',
      note: '',
    });
  }
} 