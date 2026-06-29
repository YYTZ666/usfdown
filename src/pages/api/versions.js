import { files } from '../../config/file.js';

export async function GET() {
    return new Response(JSON.stringify(files), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
