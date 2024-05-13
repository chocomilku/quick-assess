import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default theme;
