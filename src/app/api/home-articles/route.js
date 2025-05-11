import mockPosts from '@/services/mockPosts';

export async function GET() {
  return Response.json(mockPosts);
} 