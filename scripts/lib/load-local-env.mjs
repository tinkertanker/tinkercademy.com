import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

function parseEnvValue(value) {
	if (!value) return '';

	const trimmed = value.trim();
	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1).replaceAll('\\n', '\n');
	}

	return trimmed;
}

export async function loadLocalEnv(rootDir, fileNames = ['.env.local', '.env']) {
	const loadedFiles = [];

	for (const fileName of fileNames) {
		const filePath = path.join(rootDir, fileName);

		try {
			await access(filePath);
		} catch {
			continue;
		}

		const content = await readFile(filePath, 'utf8');
		for (const rawLine of content.split(/\r?\n/u)) {
			const trimmed = rawLine.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;

			const line = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
			const separatorIndex = line.indexOf('=');
			if (separatorIndex <= 0) continue;

			const key = line.slice(0, separatorIndex).trim();
			if (!/^[A-Za-z_][A-Za-z0-9_]*$/u.test(key)) continue;

			if (process.env[key] != null) continue;

			const value = parseEnvValue(line.slice(separatorIndex + 1));
			process.env[key] = value;
		}

		loadedFiles.push(filePath);
	}

	return loadedFiles;
}
