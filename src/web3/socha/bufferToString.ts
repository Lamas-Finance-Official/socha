const decoder = new TextDecoder('utf-8');

export function bufferToString(codes: number[]): string {
	return decoder.decode(new Uint8Array(codes)).replaceAll('\0', '');
}
