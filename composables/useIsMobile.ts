import { theme as tailwindTheme } from "#tailwind-config";

export default function () {
	return useMediaQuery(`(max-width: ${tailwindTheme.screens.sm})`);
}
